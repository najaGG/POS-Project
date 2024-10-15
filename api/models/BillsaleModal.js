{/*------------ ไฟล์ BillsaleModal.js ใช้สร้างฐานข้อมูล ------------- */}
const conn = require('../connect');
const { Sequelize, DataTypes } = require('sequelize');
const BillsaleModal = conn.define('billsale', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    adminID: {
        type: DataTypes.BIGINT
    },
    status :{
        type:DataTypes.STRING,
        defaultValue : 'open',
        allowNull: false,
    },
})


BillsaleModal.sync({ alter: true });
module.exports = BillsaleModal;