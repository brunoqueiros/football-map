const fs = require('fs');
const path = require('path');
const https = require('https');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// Configuration
const API_FOOTBALL_BASE_URL = 'v3.football.api-sports.io';
const API_FOOTBALL_KEY = 'af377c4b2011b229a53afb38e9348a47';
const SEASON = '2024';

// Read Gemini API key from environment or config
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

/**
 * Makes an HTTP request to API-Football
 */
function fetchTeamsForLeague(leagueId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_FOOTBALL_BASE_URL,
      path: `/teams?league=${leagueId}&season=${SEASON}`,
      method: 'GET',
      headers: {
        'accept': '*/*',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,nl;q=0.6',
        'origin': 'https://dashboard.api-football.com',
        'priority': 'u=1, i',
        'referer': 'https://dashboard.api-football.com/',
        'sec-ch-ua': '"Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
        'x-rapidapi-key': API_FOOTBALL_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error(`Failed to parse JSON response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Fetches teams for all league IDs
 */
async function fetchAllTeams(leagueIds) {
  const allTeams = [];

  console.log(`Starting to fetch teams for ${leagueIds.length} leagues...`);

  for (let i = 0; i < leagueIds.length; i++) {
    const leagueId = leagueIds[i];
    console.log(`[${i + 1}/${leagueIds.length}] Fetching teams for league ${leagueId}...`);

    try {
      const response = await fetchTeamsForLeague(leagueId);

      if (response.errors && response.errors.length > 0) {
        console.error(`  ⚠️  Errors for league ${leagueId}:`, response.errors);
      }

      if (response.response && Array.isArray(response.response)) {
        console.log(`  ✓ Found ${response.response.length} teams`);
        allTeams.push(...response.response);
      } else {
        console.log(`  ⚠️  No teams found for league ${leagueId}`);
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`  ✗ Error fetching league ${leagueId}:`, error.message);
    }
  }

  return allTeams;
}

/**
 * Removes duplicate teams based on team.id
 */
function deduplicateTeams(teams) {
  const uniqueTeams = new Map();

  for (const team of teams) {
    const teamId = team.team.id;
    if (!uniqueTeams.has(teamId)) {
      uniqueTeams.set(teamId, team);
    }
  }

  return Array.from(uniqueTeams.values());
}

/**
 * Checks if a team has complete venue information
 */
function hasCompleteVenueData(team) {
  const venue = team.venue;

  if (!venue) return false;
  if (!venue.id) return false;
  if (!venue.name) return false;
  if (!venue.address) return false;
  if (!venue.city) return false;

  return true;
}

/**
 * Finds teams with incomplete venue data
 */
function findTeamsWithIncompleteVenues(teams) {
  return teams.filter(team => !hasCompleteVenueData(team));
}

/**
 * Uses Gemini API to search for missing venue information
 */
async function searchVenueWithGemini(team) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `I need to find stadium/venue information for the football team "${team.team.name}" from ${team.team.country}.

Current venue data:
- ID: ${team.venue?.id || 'null'}
- Name: ${team.venue?.name || 'null'}
- Address: ${team.venue?.address || 'null'}
- City: ${team.venue?.city || 'null'}
- Capacity: ${team.venue?.capacity || 'null'}

Please search for this team's home stadium and provide the missing information in the following JSON format:
{
  "name": "Stadium name",
  "address": "Stadium address",
  "city": "City name",
  "capacity": capacity_number_or_null
}

Only return the JSON object, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Try to parse JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const venueData = JSON.parse(jsonMatch[0]);
      return venueData;
    }

    throw new Error('No JSON found in Gemini response');
  } catch (error) {
    console.error(`  ✗ Error searching venue for ${team.team.name}:`, error.message);
    return null;
  }
}

/**
 * Enriches teams with missing venue data using Gemini
 */
async function enrichMissingVenues(teams) {
  const teamsWithIncompleteVenues = findTeamsWithIncompleteVenues(teams);

  if (teamsWithIncompleteVenues.length === 0) {
    console.log('\n✓ All teams have complete venue data!');
    return teams;
  }

  console.log(`\n🔍 Found ${teamsWithIncompleteVenues.length} teams with incomplete venue data`);
  console.log('Starting to enrich venue data using Gemini API...\n');

  for (let i = 0; i < teamsWithIncompleteVenues.length; i++) {
    const team = teamsWithIncompleteVenues[i];
    console.log(`[${i + 1}/${teamsWithIncompleteVenues.length}] Searching venue for ${team.team.name} (${team.team.country})...`);

    try {
      const venueData = await searchVenueWithGemini(team);

      if (venueData) {
        // Update the team's venue data
        if (!team.venue) {
          team.venue = {};
        }

        // Generate a unique ID if missing
        if (!team.venue.id) {
          team.venue.id = parseInt(Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('')); // 900000 + i; // Start from 900000 to avoid conflicts
        }

        team.venue.name = venueData.name || team.venue.name;
        team.venue.address = venueData.address || team.venue.address;
        team.venue.city = venueData.city || team.venue.city;
        team.venue.capacity = venueData.capacity || team.venue.capacity;

        if (!team.venue.surface) {
          team.venue.surface = 'grass';
        }
        if (!team.venue.image) {
          team.venue.image = null;
        }

        console.log(`  ✓ Updated venue: ${team.venue.name}, ${team.venue.city}`);
      }

      // Add delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`  ✗ Failed to enrich venue:`, error.message);
    }
  }

  return teams;
}

/**
 * Main function
 */
async function main() {
  try {
    // Read league IDs from input file or command line arguments
    let leagueIds;

    const inputFile = path.join(__dirname, 'league-ids.json');
    if (fs.existsSync(inputFile)) {
      console.log('Reading league IDs from league-ids.json...');
      leagueIds = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    } else if (process.argv.length > 2) {
      // Get league IDs from command line arguments
      leagueIds = process.argv.slice(2).map(id => parseInt(id));
    } else {
      console.error('Error: Please provide league IDs either in league-ids.json or as command line arguments');
      console.log('Usage: node fetch-and-enrich-teams.js [leagueId1] [leagueId2] ...');
      console.log('Or create a league-ids.json file with an array of league IDs');
      process.exit(1);
    }

    console.log(`League IDs to fetch: ${leagueIds.join(', ')}\n`);

    // Step 1: Fetch all teams
    const allTeams = await fetchAllTeams(leagueIds);
    console.log(`\n✓ Total teams fetched: ${allTeams.length}`);

    // Step 2: Deduplicate teams
    const uniqueTeams = deduplicateTeams(allTeams);
    console.log(`✓ Unique teams after deduplication: ${uniqueTeams.length}`);

    // Step 3: Save initial data
    const outputFile = path.join(__dirname, 'new-data.json');
    fs.writeFileSync(outputFile, JSON.stringify(uniqueTeams, null, 4), 'utf8');
    console.log(`✓ Saved initial data to ${outputFile}`);

    // Step 4: Find teams with incomplete venues
    const incompleteVenuesCount = findTeamsWithIncompleteVenues(uniqueTeams).length;
    console.log(`\nTeams with incomplete venue data: ${incompleteVenuesCount}`);

    if (incompleteVenuesCount > 0) {
      // Step 5: Enrich missing venue data using Anthropic
      const enrichedTeams = await enrichMissingVenues(uniqueTeams);

      // Step 6: Save enriched data
      fs.writeFileSync(outputFile, JSON.stringify(enrichedTeams, null, 4), 'utf8');
      console.log(`\n✓ Saved enriched data to ${outputFile}`);

      // Final stats
      const stillIncomplete = findTeamsWithIncompleteVenues(enrichedTeams).length;
      console.log(`\n📊 Final Statistics:`);
      console.log(`   Total teams: ${enrichedTeams.length}`);
      console.log(`   Teams with complete venue data: ${enrichedTeams.length - stillIncomplete}`);
      console.log(`   Teams still missing venue data: ${stillIncomplete}`);
    }

    console.log('\n✅ Process completed successfully!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
main();
