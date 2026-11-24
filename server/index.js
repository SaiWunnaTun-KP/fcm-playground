import express from 'express';
import cors from 'cors';
import fcmRoutes from './routes/fcmRoutes.js';

const app = express();
const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({
  origin: CLIENT_URL
}));

app.use(express.json({ limit: '1mb' }));

app.use('/api', fcmRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});