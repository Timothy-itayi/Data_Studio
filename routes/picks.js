import express from 'express';
import picksService from '../services/picksService.js';

const router = express.Router();

// Add a new pick
router.post('/', async (req, res) => {
    try {
        const pick = await picksService.addPick(req.body);
        res.status(201).json(pick);
    } catch (error) {
        if (error.message === 'You have already picked this game') {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to add pick' });
        }
    }
});

// Get all picks for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const picks = await picksService.getUserPicks(req.params.userId);
        res.json(picks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get picks' });
    }
});

// Get picks by sport
router.get('/sport/:sportTitle', async (req, res) => {
    try {
        const picks = await picksService.getPicksBySport(req.params.sportTitle);
        res.json(picks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get picks' });
    }
});

// Update pick status
router.patch('/:pickId/status', async (req, res) => {
    try {
        const { status } = req.body;
        const result = await picksService.updatePickStatus(req.params.pickId, status);
        res.json(result);
    } catch (error) {
        if (error.message === 'Invalid status' || error.message === 'Pick not found') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to update pick status' });
        }
    }
});

// Delete a pick
router.delete('/:pickId', async (req, res) => {
    try {
        const result = await picksService.deletePick(req.params.pickId, req.body.userId);
        res.json(result);
    } catch (error) {
        if (error.message === 'Pick not found or unauthorized') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to delete pick' });
        }
    }
});

// Get pick statistics
router.get('/stats/:userId', async (req, res) => {
    try {
        const stats = await picksService.getPickStats(req.params.userId);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get pick statistics' });
    }
});

export default router; 