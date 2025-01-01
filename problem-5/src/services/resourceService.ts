import { pool } from '../config/db';
import { Resource } from '../models/resourceModel';

export const createResource = async (name: string, description: string): Promise<Resource> => {
    const query = 'INSERT INTO resources (name, description) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [name, description]);
    return result.rows[0];
};

export const listResources = async (name?: string): Promise<Resource[]> => {
    let query = 'SELECT * FROM resources';
    const values: any[] = [];

    if (name) {
        query += ' WHERE name ILIKE $1';
        values.push(`%${name}%`);
    }

    const result = await pool.query(query, values);
    return result.rows;
};

export const getResourceById = async (id: number): Promise<Resource | null> => {
    const query = 'SELECT * FROM resources WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

export const updateResource = async (id: number, name: string, description: string): Promise<Resource | null> => {
    const query = 'UPDATE resources SET name = $1, description = $2 WHERE id = $3 RETURNING *';
    const result = await pool.query(query, [name, description, id]);
    return result.rows[0] || null;
};

export const deleteResource = async (id: number): Promise<boolean> => {
    const query = 'DELETE FROM resources WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
};
