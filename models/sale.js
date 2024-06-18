const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Product = require('./product');

const Sale = sequelize.define('Sale', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Sale.belongsTo(Product);

module.exports = Sale;
