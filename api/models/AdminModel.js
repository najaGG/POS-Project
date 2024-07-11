const conn = require('../connect');
const { Sequelize, DataTypes } = require('sequelize');
const AdminModel = conn.define('admin',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING
    },
    pws:{
        type: DataTypes.BIGINT,
    }
})

AdminModel.sync({alter:true});

module.exports = AdminModel;