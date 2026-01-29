import express from 'express';
import tasksRouter from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();

const app = express();


// middleware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: 'http://127.0.0.1:5173' }));
}

app.use("/api/tasks", tasksRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '../frontend/dist/index.html'));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  console.log("Database connected successfully");
}).catch((error) => {
  console.error("Database connection failed:", error);
});

