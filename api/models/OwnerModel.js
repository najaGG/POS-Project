const conn = require('../connect');
const { Sequelize, DataTypes } = require('sequelize');
const OwnerModel = conn.define('owner',{
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
        defaultValue: 'Owner'
    }
})

OwnerModel.sync({alter:true});

module.exports = OwnerModel;