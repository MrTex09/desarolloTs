// models/Brand.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db'; // Ajusta la ruta según tu configuración

class Brand extends Model {
  public id!: string;
  public name!: string;
}

Brand.init({
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
  tableName: 'brands'
});

export { Brand };