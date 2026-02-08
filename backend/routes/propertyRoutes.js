import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { requireAgent } from '../middleware/roleMiddleware.js';
import {
  createProperty,
  listProperties,
  getPropertyById
} from '../controllers/propertyController.js';

const router = Router();

router.post('/', protect, requireAgent, createProperty);
router.get('/', listProperties);
router.get('/:id', getPropertyById);

export default router;
