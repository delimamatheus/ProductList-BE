const Sequelize = require('sequelize')
const db = require('../../util/database')

const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    categoryID: Sequelize.INTEGER,
    categoryName: Sequelize.STRING,
    price: Sequelize.FLOAT,
    status: Sequelize.BOOLEAN,
})

module.exports = Product