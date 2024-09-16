import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export const Equipment = sequelize.define('Equipment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'available',
  },
  location: DataTypes.STRING,
  purchaseDate: DataTypes.DATE,
});
