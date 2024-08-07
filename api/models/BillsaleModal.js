const conn = require('../connect');
const { Sequelize, DataTypes } = require('sequelize');
const BillsaleModal = conn.define('billsale', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    memberID: {
        type: DataTypes.BIGINT
    },
    status :{
        type:DataTypes.STRING,
        defaultValue : 'open',
        allowNull: false,
    },
})


BillsaleModal.sync({ alter: true });
module.exports = BillsaleModal;