// models/Category.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});