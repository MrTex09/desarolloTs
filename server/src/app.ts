import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { sequelize } from '../src/config/db';
import authRoutes from './routes/authRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import  userRouter from "../src/routes/userRoutes"
import brandRoutes from './routes/brandRoutes';
import categoryRoutes from './routes/categoryRoutes';
dotenv.config();

const app = express();


app.use('/brands', brandRoutes);
app.use('/categories', categoryRoutes);

// Middlewares
app.use(express.json()); // Para manejar peticiones con JSON
app.use(helmet()); // Añadir headers de seguridad
app.use(cors()); // Habilitar CORS para manejar peticiones cross-origin

// Rutas
app.use('/auth', authRoutes); // Rutas de autenticación
app.use('/api', userRouter); // Rutas de user
app.use('/equipments', equipmentRoutes); // Rutas de equipos
app.use('/api', brandRoutes ); 
app.use('/api', categoryRoutes ); 
// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos y levantar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('Error al conectar a la base de datos:', error);
  });

  