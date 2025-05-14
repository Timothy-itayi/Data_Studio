import { Router } from 'express';
import axios from 'axios';
const router = Router();

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const API_HOST = 'odds.p.rapidapi.com';

router.get('/', async (req, res) => {
  try {
    const { region = 'us', markets = 'h2h,spreads' } = req.query;

    const options = {
      method: 'GET',
      url: 'https://odds.p.rapidapi.com/v4/sports/upcoming/odds',
      params: {
        regions: region,
        markets: markets,
        oddsFormat: 'decimal',
        dateFormat: 'iso',
      },
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': RAPID_API_KEY,
      },
    };

    const response = await axios(options);
    res.json(response.data);
  } catch (error) {
    console.error('[ERROR] Fetching games:', error.message);
    res.status(500).json({ error: 'Failed to fetch upcoming games' });
  }
});

export default router;
