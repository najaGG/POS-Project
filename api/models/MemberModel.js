{/*------------ ไฟล์ MemberModel.js ใช้สร้างฐานข้อมูล ------------- */}
const conn = require('../connect');
const {sequelize ,DataTypes} = require('sequelize');
const MemberModel = conn.define('member',{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    pws:{
        type: DataTypes.STRING
    },
    AdminID:{
        type: DataTypes.BIGINT
    },
    phone:{
        type: DataTypes.BIGINT
    },
    role:{
        type: DataTypes.STRING,
        defaultValue:'member'
    },
    coin:{
        type: DataTypes.BIGINT,
        defaultValue:0
    }
})
MemberModel.sync({alter: true});
module.exports = MemberModel;