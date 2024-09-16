import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole
} from '../controllers/userController'; // Asegúrate de que esta ruta y las funciones estén correctas

const router = Router();

// Definición de rutas
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser); // Aquí se maneja la solicitud POST
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await updateUserRole(id, role);
    res.status(200).json({ message: 'User role updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: (error as Error).message });
  }
});

export default router;
