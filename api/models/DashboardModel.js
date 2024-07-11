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
    storkD:{
        type: DataTypes.BIGINT
    },
    decrease:{
        type: DataTypes.BIGINT
    }
})

DashboardModel.sync({alter: true});
module.exports = DashboardModel;