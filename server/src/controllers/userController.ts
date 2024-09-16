// src/controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../models/user'; // Asegúrate de que la ruta sea correcta
import { User as UserType } from '../interfaces/user';

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    const user = await User.create({ username, password, role });
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: Partial<UserType> = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const updatedUser = await user.update(updates);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
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
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Actualizar el rol de un usuario
export const updateUserRole = async (id: string, role: string) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.update({ role });
  } catch (error) {
    throw new Error(`Error updating user role: ${error.message}`);
  }
};
