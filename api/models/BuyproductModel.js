const conn = require('../connect');
const { Sequelize, DataTypes } = require('sequelize');
const BuyproductModel = conn.define('buyproduct', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    adminID: {
        type: DataTypes.BIGINT
    },
    productID: {
        type: DataTypes.BIGINT
    },
    qty: {
        type: DataTypes.BIGINT
    },
    price: {
        type: DataTypes.BIGINT
    },
    
})

BuyproductModel.sync({ alter: true });
module.exports = BuyproductModel;