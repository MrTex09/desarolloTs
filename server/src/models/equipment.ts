import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Brand } from './brandModel';
import { Category } from './Category'; // Asegúrate de que la extensión del archivo sea correcta

export const Equipment = sequelize.define('Equipment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'available',
  },
  location: {
    type: DataTypes.STRING,
  },
  purchaseDate: {
    type: DataTypes.DATE,
  },
});

// Definir las asociaciones
Equipment.belongsTo(Brand, { foreignKey: 'brandId' });
Equipment.belongsTo(Category, { foreignKey: 'categoryId' });

// Si necesitas exportar el modelo para su uso en otros archivos, asegúrate de hacerlo aquí
export default Equipment;
