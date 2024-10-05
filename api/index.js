import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/error.js';
import authRoutes from './routes/auth.route.js';
const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173', // Adjust to your frontend URL
  credentials: true // Enable credentials to allow cookies
}));
app.use(express.json()); 
app.use(cookieParser()); // Middleware to parse cookies

// Connect to MongoDB (adjust the connection string as needed)
mongoose.connect('mongodb+srv://nehal:Nehal123%40@datingapp.7l7qk.mongodb.net/datingapp?retryWrites=true&w=majority&appName=datingapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes); // Set up your authentication routes

// Example route for testing (optional)
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port 3000`);
});
