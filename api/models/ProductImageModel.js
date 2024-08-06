const conn = require('../connect');
const {sequelize ,DataTypes} = require('sequelize');
const ProductImage = conn.define('productimage',{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    productID:{
        type: DataTypes.BIGINT
    },
    imgName:{
        type: DataTypes.STRING
    },
    Ismain:{
        type: DataTypes.BOOLEAN,
    }
})

ProductImage.sync({alter: true});
module.exports = ProductImage;
