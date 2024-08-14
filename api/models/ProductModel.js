const { toDefaultValue } = require('sequelize/lib/utils');
const conn = require('../connect');
const { Sequelize, DataTypes } = require('sequelize');
const ProductModel = conn.define('product',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.STRING
    },
    stock:{
        type: DataTypes.STRING
    },
    detail:{
        type: DataTypes.STRING
    },
    adminID:{
        type: DataTypes.BIGINT,
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: 'active'
    },
    motor:{
        type: DataTypes.BIGINT
    }
})

ProductModel.sync({alter:true});

module.exports = ProductModel;