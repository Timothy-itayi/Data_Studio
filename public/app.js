document.addEventListener('DOMContentLoaded', () => {
    const gamesContainer = document.getElementById('games-container');
    const regionSelect = document.getElementById('region');
    const marketsSelect = document.getElementById('markets');
    const refreshButton = document.getElementById('refresh');

    // Function to format odds nicely
    const formatOdds = (price) => {
        return parseFloat(price).toFixed(2);
    };

    // Function to create a game card
    const createGameCard = (game) => {
        const card = document.createElement('div');
        card.className = 'game-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg';
        
        // Get the first bookmaker's odds
        const bookmaker = game.bookmakers?.[0];
        const h2hMarket = bookmaker?.markets?.find(m => m.key === 'h2h');
        const spreadsMarket = bookmaker?.markets?.find(m => m.key === 'spreads');

        let oddsHtml = '';
        if (h2hMarket) {
            oddsHtml += `
                <div class="mt-4">
                    <h4 class="font-semibold text-gray-700 mb-2">Moneyline</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <span class="text-sm text-gray-600">${game.home_team}</span>
                            <div class="odds-value font-mono text-lg">${formatOdds(h2hMarket.outcomes[0].price)}</div>
                        </div>
                        <div>
                            <span class="text-sm text-gray-600">${game.away_team}</span>
                            <div class="odds-value font-mono text-lg">${formatOdds(h2hMarket.outcomes[1].price)}</div>
                        </div>
                    </div>
                </div>
            `;
        }

        if (spreadsMarket) {
            oddsHtml += `
                <div class="mt-4">
                    <h4 class="font-semibold text-gray-700 mb-2">Spread</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <span class="text-sm text-gray-600">${spreadsMarket.outcomes[0].label}</span>
                            <div class="odds-value font-mono text-lg">${spreadsMarket.outcomes[0].point} (${formatOdds(spreadsMarket.outcomes[0].price)})</div>
                        </div>
                        <div>
                            <span class="text-sm text-gray-600">${spreadsMarket.outcomes[1].label}</span>
                            <div class="odds-value font-mono text-lg">${spreadsMarket.outcomes[1].point} (${formatOdds(spreadsMarket.outcomes[1].price)})</div>
                        </div>
                    </div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-xl font-bold text-gray-900">${game.sport_title}</h3>
                    <div class="text-sm text-gray-600 mt-1">
                        ${game.home_team} vs ${game.away_team}
                    </div>
                </div>
                ${bookmaker ? `
                    <div class="text-sm text-gray-500">
                        via ${bookmaker.title}
                    </div>
                ` : ''}
            </div>
            ${oddsHtml}
        `;

        return card;
    };

    // Function to fetch and display games
    const fetchGames = async () => {
        const region = regionSelect.value;
        const markets = marketsSelect.value;
        
        try {
            gamesContainer.innerHTML = `
                <div class="animate-pulse bg-white rounded-lg shadow-md p-6">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
            `.repeat(3);

            const response = await fetch(`/games?region=${region}&markets=${markets}`);
            const games = await response.json();

            if (!Array.isArray(games) || games.length === 0) {
                gamesContainer.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-gray-500">No games available at the moment.</p>
                    </div>
                `;
                return;
            }

            gamesContainer.innerHTML = '';
            games.forEach(game => {
                gamesContainer.appendChild(createGameCard(game));
            });
        } catch (error) {
            console.error('Error fetching games:', error);
            gamesContainer.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-red-500">Failed to load games. Please try again later.</p>
                </div>
            `;
        }
    };

    // Event listeners
    refreshButton.addEventListener('click', fetchGames);
    regionSelect.addEventListener('change', fetchGames);
    marketsSelect.addEventListener('change', fetchGames);

    // Initial fetch
    fetchGames();
}); 