{/*------------ ไฟล์ BuyproductModel.js ใช้สร้างฐานข้อมูล ------------- */}
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
    billSaleId:{
        type: DataTypes.BIGINT,
    },
})
BuyproductModel.sync({ alter: true });
module.exports = BuyproductModel;