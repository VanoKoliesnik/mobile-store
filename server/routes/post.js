module.exports = app => {
	const {Client} = require("pg")
	const db = new Client({
		host: "ec2-54-247-72-30.eu-west-1.compute.amazonaws.com",
		database: "d3ebri13f0dtnt",
		user: "izgmaknrmyyaxr",
		password: "fa6848671fd47284da59f4f583a92fa840cc36873968a227631d6f8698bb27b0",
		port: 5432
	})
	db.connect()
	const INSERT_USER = (user) => {
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO users(
						id, name, mail, role, password)
						VALUES ((SELECT MAX(id) FROM users) + 1, '${user.name}', '${user.mail}', 'USER', MD5('${user.password}'));`, (err, res) => {
				if (err) reject(err)
					resolve(res.rows)
				})
			}
		)
	}
	const UPDATE_USER = (user) => {
		return new Promise((resolve, reject) => {
			db.query(`UPDATE users
						SET name='${user.name}', lastname='${user.lastname}', patronymic='${user.patronymic}', mail='${user.mail}', phone='${user.phone}', gender='${user.gender}', country='${user.country}', district='${user.district}', city='${user.city}', street='${user.street}', house_number='${user.houseNumber}', apartment_number='${user.apartmentNumber}'
						WHERE id = ${+user.id};`, (err, res) => {
				if (err) reject(err)
					resolve(res)
				})
			}
		)
	}
	app.post("/update-user", (req, res) => {
		Promise.all([UPDATE_USER(req.body.user)])
			.then(result => {
				res.status(200).end() })
			.catch(err => {
				console.log(err) }) 
	})
	app.post("/insert-user", (req, res) => {
		Promise.all([INSERT_USER(req.body.user)])
			.then(result => {
				res.status(200).end() })
			.catch(err => {
				console.log(err) })
	})
}