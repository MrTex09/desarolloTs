// models/Category.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db'; // Ajusta la ruta según tu configuración
import { Brand } from './brandModel'; // Asegúrate de que la ruta sea correcta

class Category extends Model {
  public id!: string;
  public name!: string;
}

// Define el modelo
Category.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'categories'
});

// Define las asociaciones
Category.belongsTo(Brand, { foreignKey: 'brandId' });
Brand.hasMany(Category, { foreignKey: 'brandId' });

export { Category };