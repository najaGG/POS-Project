const conn = require('../connect');
const {sequelize ,DataTypes} = require('sequelize');
const MemberModel = conn.define('member',{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    pws:{
        type: DataTypes.BIGINT
    },
    AdminID:{
        type: DataTypes.BIGINT
    },
    role:{
        type: DataTypes.STRING,
        defaultValue:'member'
    }
})

MemberModel.sync({alter: true});
module.exports = MemberModel;