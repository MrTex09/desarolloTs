import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

// Definición de atributos para el modelo User
interface UserAttributes {
  id: number;
  username: string;
  gmail: string;
  password: string;
  role: 'admin' | 'user';
}

// Atributos opcionales para la creación de un nuevo usuario
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public gmail!: string;
  public password!: string;
  public role!: 'admin' | 'user';

  // Timestamps automáticos que Sequelize maneja
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicialización del modelo User con sus campos y configuraciones
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // Autoincrementar el campo id
      primaryKey: true,     // Definir como clave primaria
      allowNull: false,    // No permitir valores nulos
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,     // Campo requerido
      unique: true,         // Asegura que el nombre de usuario sea único
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: false,     // Campo requerido
      unique: true,         // Asegura que el nombre de usuario sea único
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,     // Campo requerido
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,     // Campo requerido
    },
  },
  {
    sequelize,               // Instancia de conexión a la base de datos
    tableName: 'users',      // Nombre de la tabla
    timestamps: true,        // Incluir timestamps (createdAt, updatedAt)
  }
);
