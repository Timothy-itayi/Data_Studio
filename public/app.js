document.addEventListener('DOMContentLoaded', () => {
    const gamesContainer = document.getElementById('games-container');
    const regionSelect = document.getElementById('region');
    const marketsSelect = document.getElementById('markets');
    const refreshButton = document.getElementById('refresh');
    const sportsFilter = document.getElementById('sports-filter');

    let selectedSport = null;
    let allGames = [];
    // Generate a random user ID for demo purposes
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);

    // Function to format odds nicely
    const formatOdds = (price) => {
        return parseFloat(price).toFixed(2);
    };

    // Function to save a pick to the database
    const savePick = async (pickData) => {
        try {
            const response = await fetch('/api/picks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pickData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save pick');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error saving pick:', error);
            throw error;
        }
    };

    // Function to show notification
    const showNotification = (message, isError = false) => {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            isError ? 'bg-red-500' : 'bg-green-500'
        } text-white text-sm font-semibold transition-opacity duration-500`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    };

    // Function to handle pick submission
    const handlePickSubmission = async (game, team, odds) => {
        try {
            const pickData = {
                userId,
                gameId: game.id,
                sportTitle: game.sport_title,
                homeTeam: game.home_team,
                awayTeam: game.away_team,
                pickedTeam: team,
                odds: odds,
                region: regionSelect.value
            };

            await savePick(pickData);
            showNotification(`Successfully locked in ${team} at ${formatOdds(odds)}`);
        } catch (error) {
            showNotification(error.message || 'Failed to save pick', true);
        }
    };

    // Sport-specific color schemes
    const sportColors = {
        'NFL': { bg: 'bg-red-100', text: 'text-red-900', accent: 'bg-red-500', badge: 'bg-red-500' },
        'NBA': { bg: 'bg-orange-100', text: 'text-orange-900', accent: 'bg-orange-500', badge: 'bg-orange-500' },
        'MLB': { bg: 'bg-blue-100', text: 'text-blue-900', accent: 'bg-blue-500', badge: 'bg-blue-500' },
        'NHL': { bg: 'bg-indigo-100', text: 'text-indigo-900', accent: 'bg-indigo-500', badge: 'bg-indigo-500' },
        'Soccer': { bg: 'bg-green-100', text: 'text-green-900', accent: 'bg-green-500', badge: 'bg-green-500' },
        'default': { bg: 'bg-gray-100', text: 'text-gray-900', accent: 'bg-gray-500', badge: 'bg-gray-500' }
    };

    // Region-specific styles
    const regionStyles = {
        'us': { flag: '🇺🇸', bg: 'bg-blue-50' },
        'uk': { flag: '🇬🇧', bg: 'bg-red-50' },
        'eu': { flag: '🇪🇺', bg: 'bg-yellow-50' },
        'au': { flag: '🇦🇺', bg: 'bg-green-50' }
    };

    // Function to create a game card
    const createGameCard = (game) => {
        const card = document.createElement('div');
        const colors = sportColors[game.sport_title] || sportColors.default;
        const region = regionSelect.value;
        const regionStyle = regionStyles[region] || regionStyles.us;
        
        card.className = `game-card ${colors.bg} ${regionStyle.bg} rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300`;
        
        // Get the first bookmaker's odds
        const bookmaker = game.bookmakers?.[0];
        const h2hMarket = bookmaker?.markets?.find(m => m.key === 'h2h');
        const spreadsMarket = bookmaker?.markets?.find(m => m.key === 'spreads');

        let oddsHtml = '';
        if (h2hMarket) {
            const homeOdds = h2hMarket.outcomes[0].price;
            const awayOdds = h2hMarket.outcomes[1].price;
            
            oddsHtml += `
                <div class="mt-4">
                    <h4 class="font-semibold ${colors.text} mb-2">Moneyline</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="relative p-3 rounded-lg bg-white bg-opacity-50 group cursor-pointer">
                            <span class="text-sm ${colors.text}">${game.home_team}</span>
                            <div class="odds-value font-mono text-lg font-bold ${colors.text}">
                                ${formatOdds(homeOdds)}
                            </div>
                            <button 
                                class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-10 rounded-lg flex items-center justify-center transition-opacity duration-200"
                                onclick="handlePickSubmission(${JSON.stringify({
                                    id: game.id,
                                    sport_title: game.sport_title,
                                    home_team: game.home_team,
                                    away_team: game.away_team
                                })}, '${game.home_team}', ${homeOdds})"
                            >
                                <span class="bg-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                                    Lock Pick
                                </span>
                            </button>
                        </div>
                        <div class="relative p-3 rounded-lg bg-white bg-opacity-50 group cursor-pointer">
                            <span class="text-sm ${colors.text}">${game.away_team}</span>
                            <div class="odds-value font-mono text-lg font-bold ${colors.text}">
                                ${formatOdds(awayOdds)}
                            </div>
                            <button 
                                class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-10 rounded-lg flex items-center justify-center transition-opacity duration-200"
                                onclick="handlePickSubmission(${JSON.stringify({
                                    id: game.id,
                                    sport_title: game.sport_title,
                                    home_team: game.home_team,
                                    away_team: game.away_team
                                })}, '${game.away_team}', ${awayOdds})"
                            >
                                <span class="bg-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                                    Lock Pick
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        if (spreadsMarket) {
            oddsHtml += `
                <div class="mt-4">
                    <h4 class="font-semibold ${colors.text} mb-2">Spread</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="relative p-3 rounded-lg bg-white bg-opacity-50 group cursor-pointer">
                            <span class="text-sm ${colors.text}">${spreadsMarket.outcomes[0].label}</span>
                            <div class="odds-value font-mono text-lg font-bold ${colors.text}">
                                ${spreadsMarket.outcomes[0].point} (${formatOdds(spreadsMarket.outcomes[0].price)})
                            </div>
                            <button 
                                class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-10 rounded-lg flex items-center justify-center transition-opacity duration-200"
                                onclick="handlePickSubmission(${JSON.stringify({
                                    id: game.id,
                                    sport_title: game.sport_title,
                                    home_team: game.home_team,
                                    away_team: game.away_team
                                })}, '${spreadsMarket.outcomes[0].label}', ${spreadsMarket.outcomes[0].price})"
                            >
                                <span class="bg-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                                    Lock Pick
                                </span>
                            </button>
                        </div>
                        <div class="relative p-3 rounded-lg bg-white bg-opacity-50 group cursor-pointer">
                            <span class="text-sm ${colors.text}">${spreadsMarket.outcomes[1].label}</span>
                            <div class="odds-value font-mono text-lg font-bold ${colors.text}">
                                ${spreadsMarket.outcomes[1].point} (${formatOdds(spreadsMarket.outcomes[1].price)})
                            </div>
                            <button 
                                class="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-10 rounded-lg flex items-center justify-center transition-opacity duration-200"
                                onclick="handlePickSubmission(${JSON.stringify({
                                    id: game.id,
                                    sport_title: game.sport_title,
                                    home_team: game.home_team,
                                    away_team: game.away_team
                                })}, '${spreadsMarket.outcomes[1].label}', ${spreadsMarket.outcomes[1].price})"
                            >
                                <span class="bg-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                                    Lock Pick
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <div class="flex items-center gap-2">
                        <h3 class="text-xl font-bold ${colors.text}">${game.sport_title}</h3>
                        <span class="text-xl">${regionStyle.flag}</span>
                    </div>
                    <div class="text-sm ${colors.text} mt-1 opacity-75">
                        ${game.home_team} vs ${game.away_team}
                    </div>
                </div>
                ${bookmaker ? `
                    <div class="text-sm ${colors.text} opacity-75">
                        via ${bookmaker.title}
                    </div>
                ` : ''}
            </div>
            ${oddsHtml}
        `;

        return card;
    };

    // Function to create sport filter badges
    const createSportsBadges = (games) => {
        if (!Array.isArray(games) || games.length === 0) {
            sportsFilter.innerHTML = `
                <div class="text-gray-500 text-sm">
                    No sports available at the moment
                </div>
            `;
            return;
        }

        const sports = [...new Set(games.map(game => game.sport_title))];
        sportsFilter.innerHTML = sports.map(sport => {
            const colors = sportColors[sport] || sportColors.default;
            const isSelected = selectedSport === sport;
            return `
                <button 
                    class="sport-badge ${isSelected ? colors.badge + ' text-white' : 'bg-white ' + colors.text} 
                    px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300
                    ${isSelected ? '' : 'hover:' + colors.bg}"
                    data-sport="${sport}">
                    ${sport}
                </button>
            `;
        }).join('');

        // Add "All Sports" button
        const allSportsBtn = document.createElement('button');
        allSportsBtn.className = `sport-badge ${!selectedSport ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
            px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300
            ${!selectedSport ? '' : 'hover:bg-gray-100'}`;
        allSportsBtn.textContent = 'All Sports';
        allSportsBtn.dataset.sport = '';
        sportsFilter.insertBefore(allSportsBtn, sportsFilter.firstChild);

        // Add click handlers
        document.querySelectorAll('.sport-badge').forEach(badge => {
            badge.addEventListener('click', () => {
                selectedSport = badge.dataset.sport || null;
                displayFilteredGames();
                createSportsBadges(allGames);
            });
        });
    };

    // Function to display filtered games
    const displayFilteredGames = () => {
        if (!Array.isArray(allGames) || allGames.length === 0) {
            showEmptyState('No games data available');
            return;
        }

        const filteredGames = selectedSport 
            ? allGames.filter(game => game.sport_title === selectedSport)
            : allGames;

        if (filteredGames.length === 0) {
            showEmptyState(`No games available for ${selectedSport || 'any sport'} at the moment`);
            return;
        }

        gamesContainer.innerHTML = '';
        filteredGames.forEach(game => {
            gamesContainer.appendChild(createGameCard(game));
        });
    };

    // Function to show empty state
    const showEmptyState = (message) => {
        gamesContainer.innerHTML = `
            <div class="col-span-full md:col-span-2 lg:col-span-3">
                <div class="bg-white rounded-lg shadow-md p-8 text-center">
                    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">No Games Found</h3>
                    <p class="text-gray-600">${message}</p>
                    <p class="text-gray-500 text-sm mt-2">Try changing your filters or check back later</p>
                </div>
            </div>
        `;
    };

    // Function to show loading state
    const showLoadingState = () => {
        gamesContainer.innerHTML = `
            <div class="col-span-full md:col-span-2 lg:col-span-3 flex items-center justify-center py-12">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p class="text-gray-600">Loading games data...</p>
                </div>
            </div>
        `;
    };

    // Function to fetch and display games
    const fetchGames = async () => {
        const region = regionSelect.value;
        const markets = marketsSelect.value;
        
        try {
            showLoadingState();

            const response = await fetch(`/games?region=${region}&markets=${markets}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            allGames = await response.json();
            createSportsBadges(allGames);
            displayFilteredGames();
        } catch (error) {
            console.error('Error fetching games:', error);
            showEmptyState('Failed to load games. Please try again later.');
        }
    };

    // Make handlePickSubmission available globally
    window.handlePickSubmission = handlePickSubmission;

    // Event listeners
    refreshButton.addEventListener('click', fetchGames);
    regionSelect.addEventListener('change', fetchGames);
    marketsSelect.addEventListener('change', fetchGames);

    // Initial fetch
    fetchGames();
}); 