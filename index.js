const express = require('express')
const bodyparser = require('body-parser')
const sequelize = require('./src/util/database')
const cors = require('cors')
const { getUsers } = require('./src/controllers/user')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE')
    next()
})

app.get('/', (req, res, next) => {
    res.send('Hello World')
})

app.use('/users', require('./src/routes/user'))
app.use('/products', require('./src/routes/product'))

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({ message: message })
})

sequelize
    .sync()
    .then(result => {
        console.log('Database connected')
        app.listen(3001)
    })
    .catch(err => console.log(err))

