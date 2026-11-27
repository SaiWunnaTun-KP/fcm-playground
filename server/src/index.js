import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fcmRoutes from './routes/fcmRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '1mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'FCM Playground Backend API',
    timestamp: new Date().toISOString(),
  });
});

// FCM Endpoints
app.use('/api/fcm', fcmRoutes);

// Invalid JSON Body Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'invalid-json-body',
        title: 'JSON Request ပုံစံ မှားယွင်းနေပါသည်',
        explanation: err.message,
        suggestion: 'ပေးပို့သော JSON format မှန်ကန်မှု ရှိ/မရှိ စစ်ဆေးပါ။',
      },
    });
  }
  next(err);
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`FCM Playground Server running on http://localhost:${PORT}`);
  });
}

export default app;