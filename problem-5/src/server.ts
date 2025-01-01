// Import required modules
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(bodyParser.json());

// Create a resource
app.post('/resources', async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const query = 'INSERT INTO resources (name, description) VALUES ($1, $2) RETURNING *';
        const values = [name, description];
        const result = await pool.query(query, values);
        res.status(200).json({success: true, data: result.rows[0], message: 'Resource created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create resource' });
    }
});

// List resources with basic filters
app.get('/resources', async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        let query = 'SELECT * FROM resources';
        const values: any[] = [];

        if (name) {
            query += ' WHERE name ILIKE $1';
            values.push(`%${name}%`);
        }

        const result = await pool.query(query, values);
        res.status(200).json({success: true, data: result.rows, message: 'Resources fetched successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to list resources' });
    }
});

// Get details of a resource
app.get('/resources/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM resources WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Resource not found' });
        } else {
            res.status(200).json({success: true, data: result.rows[0], message: 'Resource details fetched successfully'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch resource details' });
    }
});

// Update resource details
app.put('/resources/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const query = 'UPDATE resources SET name = $1, description = $2 WHERE id = $3 RETURNING *';
        const values = [name, description, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Resource not found' });
        } else {
            res.status(200).json({success: true, data: result.rows[0], message: 'Resource updated successfully'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update resource' });
    }
});

// Delete a resource
app.delete('/resources/:id', async (req: Request, res: Response): Promise<void> => {``
    try {
        const { id } = req.params;
        const query = 'DELETE FROM resources WHERE id = $1';
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Resource not found' });
        } else {
            res.status(200).json({success: true, message: 'Resource deleted successfully'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete resource' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
