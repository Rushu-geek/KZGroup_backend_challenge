import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', resourceRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
