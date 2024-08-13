const conn = require('../connect');
const {sequelize ,DataTypes} = require('sequelize');
const DashboardModel = conn.define('dashboard',{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    productID:{
        type: DataTypes.BIGINT
    },
    nameProduct:{
        type: DataTypes.STRING
    },
    storkD:{
        type: DataTypes.BIGINT,
        defaultValue: 0
    },
    decrease:{
        type: DataTypes.BIGINT,
        defaultValue: 0
    }
})

DashboardModel.sync({alter: true});
module.exports = DashboardModel;