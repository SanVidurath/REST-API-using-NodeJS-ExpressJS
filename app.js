import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth-routes.js';
import productRoutes from './routes/product-routes.js';

const app = express();

// DB connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
