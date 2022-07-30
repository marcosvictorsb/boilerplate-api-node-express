const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize();

class Customers extends Model { }

Customers.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  updated_at: {
    type: DataTypes.DATE,
  },

}, {
  sequelize,
  modelName: 'Customers',
});

module.exports = Customers;
