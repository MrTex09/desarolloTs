import { Request, Response } from 'express';
import { User } from '../models/user'; // Asegúrate de que la ruta sea correcta
import bcrypt from 'bcryptjs';
import { User as UserType } from '../interfaces/user';

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error fetching user', error: (error as Error).message });
  }
};

// Crear un nuevo usuario// src/controllers/userController.ts

export const createUser = async (req: Request, res: Response) => {
  const { username, password, role, gmail } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, gmail, password: hashedPassword, role });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Error creating user: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Unknown error occurred while creating user' });
    }
  }
};


// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: Partial<UserType> = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Asegúrate de que `role` sea uno de los valores permitidos
    if (updates.role && !['admin', 'user'].includes(updates.role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Crear un nuevo objeto de actualizaciones sin el campo id
    const { id: _, ...updateData } = updates;
    const updatedUser = await user.update(updateData as any); // `as any` puede ser utilizado aquí si el tipo sigue sin coincidir
    res.status(200).json(updatedUser);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error updating user', error: (error as Error).message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.status(200).json({ message: 'User deleted' });
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error deleting user', error: (error as Error).message });
  }
};

// Actualizar el rol de un usuario
export const updateUserRole = async (id: string, role: 'admin' | 'user') => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');

    // Asegúrate de que `role` sea uno de los valores permitidos
    if (!['admin', 'user'].includes(role)) {
      throw new Error('Invalid role');
    }

    await user.update({ role });
  } catch (error: unknown) {
    throw new Error(`Error updating user role: ${(error as Error).message}`);
  }
};
