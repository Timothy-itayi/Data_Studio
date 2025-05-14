import { Router } from 'express';
import { randomUUID } from 'crypto';

const router = Router();

// In-memory storage for picks (temporary solution)
const picks = new Map();

// Store a new pick
router.post('/', async (req, res) => {
    try {
        const pick = req.body;
        const pickId = randomUUID();
        
        // Add metadata
        pick.id = pickId;
        pick.created_at = new Date().toISOString();
        pick.status = 'pending';

        // Store in memory
        picks.set(pickId, pick);

        res.status(201).json({
            message: 'Pick saved successfully',
            pickId,
            pick
        });
    } catch (error) {
        console.error('[ERROR] Saving pick:', error);
        res.status(500).json({ error: 'Failed to save pick' });
    }
});

// Get a specific pick
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pick = picks.get(id);

        if (!pick) {
            return res.status(404).json({ error: 'Pick not found' });
        }

        res.json(pick);
    } catch (error) {
        console.error('[ERROR] Fetching pick:', error);
        res.status(500).json({ error: 'Failed to fetch pick' });
    }
});

// Get all picks
router.get('/', async (req, res) => {
    try {
        const allPicks = Array.from(picks.values());
        res.json(allPicks);
    } catch (error) {
        console.error('[ERROR] Fetching picks:', error);
        res.status(500).json({ error: 'Failed to fetch picks' });
    }
});

export default router; 