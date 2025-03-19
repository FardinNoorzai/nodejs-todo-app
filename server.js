require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Request Body:');
    for (const [key, value] of Object.entries(req.body)) {
        console.log(`  ${key}: ${value}`);
    }
    next();
};
app.use(logger)
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

const userRoutes = require('./routes/user_routes');
app.use('/api/users', userRoutes);

const taskRoutes = require('./routes/task_routes'); 
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});