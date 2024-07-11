const conn = require('../connect');
const { Sequelize, DataTypes } = require('sequelize');
const ProductModel = conn.define('product',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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
})

ProductModel.sync({alter:true});

module.exports = ProductModel;