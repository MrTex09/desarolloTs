// src/config/initAdmin.ts
import { User } from '../models/user'; // Ajusta la ruta según tu estructura
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/db'; // Asegúrate de importar la instancia de sequelize

const createAdminUser = async () => {
  try {
    console.log('Conectando a la base de datos...');
    // Verifica la conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');

    // Verifica si el usuario admin ya existe
    console.log('Verificando si el usuario admin ya existe...');
    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Si no existe, crea el usuario admin
    console.log('Creando el usuario admin...');
    const hashedPassword = await bcrypt.hash('2004', 10); // Cambia la contraseña por defecto si es necesario

    const newUser = await User.create({
      username: 'admin',
      gmail: 'admin@example.com', // Cambia el email si es necesario
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created', newUser);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminUser();
