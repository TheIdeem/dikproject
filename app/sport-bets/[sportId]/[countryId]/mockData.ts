// Mock sport names - this would come from API/backend in a real app
export const sportNames: Record<string, string> = {
  'football': 'Football',
  'ice-hockey': 'Ice Hockey',
  'basketball': 'Basketball',
  'tennis': 'Tennis',
  'volleyball': 'Volleyball',
  'american-football': 'American Football',
  'baseball': 'Baseball',
  'boxing': 'Boxing',
  'darts': 'Darts',
  'futsal': 'Futsal',
  'handball': 'Handball',
  'table-tennis': 'Table Tennis'
};

// Mock country names - this would come from API/backend in a real app
export const countryNames: Record<string, string> = {
  'european-clubs': 'European Clubs',
  'germany': 'Germany',
  'england': 'England',
  'spain': 'Spain',
  'italy': 'Italy',
  'france': 'France',
  'turkey': 'Turkey',
  'austria': 'Austria',
  'netherlands': 'Netherlands',
  'portugal': 'Portugal',
  'belgium': 'Belgium',
  'scotland': 'Scotland',
  'sweden': 'Sweden',
  'norway': 'Norway',
  'denmark': 'Denmark',
  'greece': 'Greece',
  'usa': 'USA',
  'international': 'International',
  'europe': 'Europe'
};

// Mock leagues data - this would come from API/backend in a real app
export const leaguesByCountry: Record<string, Record<string, Array<{ name: string, matchCount: number }>>> = {
  'football': {
    'european-clubs': [
      { name: 'UEFA Champions League', matchCount: 4 },
      { name: 'UEFA Europa League', matchCount: 4 },
      { name: 'Copa Libertadores', matchCount: 32 },
      { name: 'Copa Sudamericana', matchCount: 33 },
      { name: 'UEFA Europa Conference League', matchCount: 4 },
    ],
    'england': [
      { name: 'Premier League', matchCount: 10 },
      { name: 'Championship', matchCount: 12 },
      { name: 'FA Cup', matchCount: 8 },
    ],
    'spain': [
      { name: 'La Liga', matchCount: 10 },
      { name: 'Copa del Rey', matchCount: 8 },
    ],
    'germany': [
      { name: 'Bundesliga', matchCount: 9 },
      { name: 'DFB Pokal', matchCount: 6 },
    ],
    'italy': [
      { name: 'Serie A', matchCount: 10 },
      { name: 'Coppa Italia', matchCount: 7 },
    ],
    'france': [
      { name: 'Ligue 1', matchCount: 10 },
      { name: 'Coupe de France', matchCount: 5 },
    ],
  },
  'basketball': {
    'european-clubs': [
      { name: 'ABA League', matchCount: 1 },
      { name: 'Euroleague', matchCount: 9 },
      { name: 'FIBA Europe Cup', matchCount: 2 },
      { name: 'FIBA 3X3 Europe Cup', matchCount: 2 },
      { name: 'BNXT League', matchCount: 4 },
    ],
    'usa': [
      { name: 'NBA', matchCount: 15 },
      { name: 'NCAA', matchCount: 12 },
    ],
    'spain': [
      { name: 'Liga ACB', matchCount: 8 },
    ],
    'italy': [
      { name: 'Lega Basket Serie A', matchCount: 8 },
    ],
  },
  'tennis': {
    'international': [
      { name: 'ATP Tour', matchCount: 12 },
      { name: 'WTA Tour', matchCount: 10 },
      { name: 'Grand Slam', matchCount: 4 },
    ],
  },
  'ice-hockey': {
    'usa': [
      { name: 'NHL', matchCount: 16 },
    ],
    'europe': [
      { name: 'KHL', matchCount: 12 },
      { name: 'SHL', matchCount: 8 },
    ],
  },
  'volleyball': {
    'international': [
      { name: 'FIVB World Championship', matchCount: 6 },
      { name: 'CEV Champions League', matchCount: 8 },
    ],
    'italy': [
      { name: 'SuperLega', matchCount: 10 },
    ],
  },
};

// Mock matches data - this would come from API/backend in a real app
export const generateMatches = (sportId: string, countryId: string, seed: number = 1, leagueId?: string) => {
  // For demonstration, generate matches based on sport and country
  const teamsByCountry: Record<string, string[]> = {
    'germany': ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Eintracht Frankfurt'],
    'england': ['Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'Manchester City', 'Tottenham'],
    'spain': ['Barcelona', 'Real Madrid', 'Atletico Madrid', 'Sevilla', 'Valencia'],
    'italy': ['Juventus', 'Inter Milan', 'AC Milan', 'Roma', 'Napoli'],
    'france': ['PSG', 'Marseille', 'Lyon', 'Monaco', 'Lille'],
    'european-clubs': ['Real Madrid', 'Bayern Munich', 'Manchester City', 'PSG', 'Liverpool', 'Juventus', 'Barcelona'],
    'usa': ['LA Lakers', 'Boston Celtics', 'Chicago Bulls', 'Miami Heat', 'Golden State Warriors', 'Brooklyn Nets'],
    'international': ['Team USA', 'Team Spain', 'Team France', 'Team Serbia', 'Team Australia']
  };

  // Default teams if country not in the list
  const defaultTeams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'];
  const teams = teamsByCountry[countryId] || defaultTeams;
  
  // Use a deterministic approach for "random" generation
  // Based on sportId, countryId and a seed value
  const pseudoRandom = (max: number, offset: number = 0) => {
    // Create a simple hash from sportId and countryId and offset
    const hashStr = sportId + countryId + (leagueId || '') + offset.toString() + seed.toString();
    let hash = 0;
    for (let i = 0; i < hashStr.length; i++) {
      hash = ((hash << 5) - hash) + hashStr.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    // Get a positive value between 0 and max-1
    return Math.abs(hash % max);
  };
  
  // Generate fixed number of matches for consistency - using a fixed number prevents hydration issues
  const matchCount = leagueId ? 8 : 5; // More matches for league pages
  const matches = [];
  
  for (let i = 0; i < matchCount; i++) {
    const homeIndex = pseudoRandom(teams.length, i);
    let awayIndex = pseudoRandom(teams.length, i + 1000);
    
    // Make sure home and away teams are different
    if (awayIndex === homeIndex) {
      awayIndex = (awayIndex + 1) % teams.length;
    }
    
    const homeTeam = teams[homeIndex];
    const awayTeam = teams[awayIndex];
    
    // Generate match date deterministically
    const day = 1 + pseudoRandom(28, i + 2000);
    const month = 1 + pseudoRandom(12, i + 3000);
    const dateStr = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`;
    
    // Generate time deterministically
    const hours = pseudoRandom(24, i + 4000);
    const minutes = pseudoRandom(60, i + 5000);
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
    // Generate odds deterministically
    const homeOdds = (1 + (pseudoRandom(400, i + 6000) / 100)).toFixed(2);
    const drawOdds = (1 + (pseudoRandom(400, i + 7000) / 100)).toFixed(2);
    const awayOdds = (1 + (pseudoRandom(400, i + 8000) / 100)).toFixed(2);
    
    matches.push({
      id: `match-${i}`,
      homeTeam,
      awayTeam,
      date: dateStr,
      time: timeStr,
      odds: {
        home: homeOdds,
        draw: drawOdds,
        away: awayOdds
      }
    });
  }
  
  return matches;
}; 