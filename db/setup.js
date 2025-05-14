import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new database connection
const dbPath = path.join(__dirname, 'picks.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to SQLite database');
});

// Create picks table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS picks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            game_id TEXT NOT NULL,
            sport_title TEXT NOT NULL,
            home_team TEXT NOT NULL,
            away_team TEXT NOT NULL,
            picked_team TEXT NOT NULL,
            odds REAL NOT NULL,
            region TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'won', 'lost')),
            UNIQUE(user_id, game_id)
        )
    `, (err) => {
        if (err) {
            console.error('Error creating picks table:', err);
            return;
        }
        console.log('Picks table created successfully');
    });

    // Create indexes for better query performance
    db.run(`CREATE INDEX IF NOT EXISTS idx_picks_user_id ON picks(user_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_picks_game_id ON picks(game_id)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_picks_sport ON picks(sport_title)`);
});

export default db; 