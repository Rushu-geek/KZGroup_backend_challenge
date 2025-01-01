import { Request, Response } from 'express';
import * as resourceService from '../services/resourceService';

// Controller to create a resource
export const createResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;
        const resource = await resourceService.createResource(name, description);
        res.status(201).json({ success: true, data: resource, message: 'Resource created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create resource' });
    }
};

// Controller to list resources
export const listResources = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.query as { name?: string };
        const resources = await resourceService.listResources(name);
        res.status(200).json({ success: true, data: resources, message: 'Resources fetched successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch resources' });
    }
};

// Controller to get a resource by ID
export const getResourceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const resource = await resourceService.getResourceById(Number(id));

        if (!resource) {
            res.status(404).json({ success: false, message: 'Resource not found' });
            return;
        }

        res.status(200).json({ success: true, data: resource, message: 'Resource fetched successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch resource' });
    }
};

// Controller to update a resource
export const updateResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const resource = await resourceService.updateResource(Number(id), name, description);

        if (!resource) {
            res.status(404).json({ success: false, message: 'Resource not found' });
            return;
        }

        res.status(200).json({ success: true, data: resource, message: 'Resource updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update resource' });
    }
};

// Controller to delete a resource
export const deleteResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deleted = await resourceService.deleteResource(Number(id));

        if (!deleted) {
            res.status(404).json({ success: false, message: 'Resource not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete resource' });
    }
};