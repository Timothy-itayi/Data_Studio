import db from '../db/setup.js';

class PicksService {
    // Add a new pick
    async addPick(pickData) {
        return new Promise((resolve, reject) => {
            const {
                userId,
                gameId,
                sportTitle,
                homeTeam,
                awayTeam,
                pickedTeam,
                odds,
                region
            } = pickData;

            const query = `
                INSERT INTO picks (
                    user_id,
                    game_id,
                    sport_title,
                    home_team,
                    away_team,
                    picked_team,
                    odds,
                    region
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.run(query, 
                [userId, gameId, sportTitle, homeTeam, awayTeam, pickedTeam, odds, region],
                function(err) {
                    if (err) {
                        // If the error is due to duplicate entry, return a specific error
                        if (err.message.includes('UNIQUE constraint failed')) {
                            reject(new Error('You have already picked this game'));
                        } else {
                            reject(err);
                        }
                        return;
                    }
                    resolve({ id: this.lastID });
                }
            );
        });
    }

    // Get all picks for a user
    async getUserPicks(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM picks 
                WHERE user_id = ? 
                ORDER BY created_at DESC
            `;

            db.all(query, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    // Get picks by sport
    async getPicksBySport(sportTitle) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM picks 
                WHERE sport_title = ? 
                ORDER BY created_at DESC
            `;

            db.all(query, [sportTitle], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    // Update pick status
    async updatePickStatus(pickId, status) {
        return new Promise((resolve, reject) => {
            if (!['pending', 'won', 'lost'].includes(status)) {
                reject(new Error('Invalid status'));
                return;
            }

            const query = `
                UPDATE picks 
                SET status = ? 
                WHERE id = ?
            `;

            db.run(query, [status, pickId], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                if (this.changes === 0) {
                    reject(new Error('Pick not found'));
                    return;
                }
                resolve({ updated: true });
            });
        });
    }

    // Delete a pick
    async deletePick(pickId, userId) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM picks 
                WHERE id = ? AND user_id = ?
            `;

            db.run(query, [pickId, userId], function(err) {
                if (err) {
                    reject(err);
                    return;
                }
                if (this.changes === 0) {
                    reject(new Error('Pick not found or unauthorized'));
                    return;
                }
                resolve({ deleted: true });
            });
        });
    }

    // Get pick statistics
    async getPickStats(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    sport_title,
                    COUNT(*) as total_picks,
                    SUM(CASE WHEN status = 'won' THEN 1 ELSE 0 END) as wins,
                    SUM(CASE WHEN status = 'lost' THEN 1 ELSE 0 END) as losses,
                    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
                FROM picks 
                WHERE user_id = ?
                GROUP BY sport_title
            `;

            db.all(query, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }
}

export default new PicksService(); 