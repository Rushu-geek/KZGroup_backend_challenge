import { Router } from 'express';
import * as resourceController from '../controllers/resourceController';

const router = Router();

// Route to create a resource
router.post('/resources', resourceController.createResource);

// Route to list resources
router.get('/resources', resourceController.listResources);

// Route to get a resource by ID
router.get('/resources/:id', resourceController.getResourceById);

// Route to update a resource
router.put('/resources/:id', resourceController.updateResource);

// Route to delete a resource
router.delete('/resources/:id', resourceController.deleteResource);

export default router;