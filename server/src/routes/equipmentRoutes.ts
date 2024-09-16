import { Router } from 'express';
import { createEquipment, getAllEquipments, updateEquipment, deleteEquipment } from '../controllers/equipmentController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, createEquipment);
router.get('/', authenticateJWT, getAllEquipments);
router.put('/:id', authenticateJWT, updateEquipment);
router.delete('/:id', authenticateJWT, deleteEquipment);

export default router;
