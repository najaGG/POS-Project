{/*------------ ไฟล์ AdminModel.js ใช้สร้างฐานข้อมูล ------------- */}
const conn = require('../connect');
const { Sequelize, DataTypes } = require('sequelize');
const AdminModel = conn.define('admin',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    phone:{
        type: DataTypes.BIGINT,
    },
    pws:{
        type: DataTypes.STRING,
    },
    role:{
        type: DataTypes.STRING,
        defaultValue: 'admin'
    }
})

AdminModel.sync({alter:true});

module.exports = AdminModel;