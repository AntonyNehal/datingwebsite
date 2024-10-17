// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { errorHandler } from './utils/error.js';
// import authRoutes from './routes/auth.route.js';
// import userRoutes from './routes/user.routes.js'
// const app = express();
// // Middleware setup
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your frontend URL
//   credentials: true, // Include cookies in requests if necessary
// }));

// app.use(express.json()); 
// app.use(cookieParser()); // Middleware to parse cookies

// // Connect to MongoDB (adjust the connection string as needed)
// mongoose.connect('mongodb+srv://nehal:Nehal123%40@datingapp.7l7qk.mongodb.net/datingapp?retryWrites=true&w=majority&appName=datingapp', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes); // Set up your authentication routes
// app.use('/api/user',userRoutes);
// // Example route for testing (optional)
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // Error handling middleware (optional)
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).send('Something broke!');
// // });
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || 'Something went wrong';
//   console.error(`[${status}] ${message}`);
//   res.status(status).json({ message });
// });
// Start the server
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/error.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// === Middleware Setup === //
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to match your frontend URL
  credentials: true, // Allows frontend to send cookies with requests
}));

app.use(express.json()); // To parse incoming JSON payloads
app.use(cookieParser()); // To parse cookies

// === MongoDB Connection === //
mongoose.connect(
  'mongodb+srv://nehal:Nehal123%40@datingapp.7l7qk.mongodb.net/datingapp?retryWrites=true&w=majority&appName=datingapp'
)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// === Route Setup === //
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/user', userRoutes); // User routes

// Test route (Optional)
app.get('/', (req, res) => {
  res.send('Server is running');
});

// === Error Handling Middleware === //
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  console.error(`[${status}] ${message}`);
  res.status(status).json({ message });
});

// === Start the Server === //
const PORT = process.env.PORT || 3000; // Use environment variable if available
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
