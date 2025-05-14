import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import gamesRoute from './routes/games.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/games', gamesRoute);

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
