// src/routes/userRoutes.ts
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole
} from '../controllers/userController';

const router = Router();

// Obtener todos los usuarios
router.get('/users', getAllUsers);

// Obtener un usuario por ID
router.get('/users/:id', getUserById);

// Crear un nuevo usuario
router.post('/users', createUser);

// Actualizar un usuario
router.put('/users/:id', updateUser);

// Eliminar un usuario
router.delete('/users/:id', deleteUser);

// Actualizar el rol de un usuario
    router.patch('/users/:id/role', async (req, res) => {
      const { id } = req.params;
      const { role } = req.body;
      try {
        await updateUserRole(id, role);
        res.status(200).json({ message: 'User role updated' });
      } catch (error: any) { // Added 'any' type to 'error'
        res.status(500).json({ message: error.message });
      }
    });

// Ruta para hacer un usuario admin (puedes elegir otro método si es necesario)
router.put('/users/:id/make-admin', async (req, res) => {
  const { id } = req.params;
  try {
    await updateUserRole(id, 'admin');
    res.status(200).json({ message: 'User role updated to admin' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user role' });
  }
});

export default router;
