import { Request, Response } from 'express';
import { Equipment } from '../models/equipment';

export const createEquipment = async (req: Request, res: Response) => {
  const { name, status, location, purchaseDate } = req.body;
  try {
    const equipment = await Equipment.create({ name, status, location, purchaseDate });
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating equipment', error });
  }
};

export const getAllEquipments = async (req: Request, res: Response) => {
  try {
    const equipments = await Equipment.findAll();
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching equipments', error });
  }
};

export const updateEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    await equipment.update(req.body);
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating equipment', error });
  }
};

export const deleteEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    await equipment.destroy();
    res.json({ message: 'Equipment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting equipment', error });
  }
};
