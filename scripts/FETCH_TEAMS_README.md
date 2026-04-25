# Fetch and Enrich Teams Script

This script fetches team data from the API-Football API, deduplicates it, and enriches missing venue information using the Anthropic API.

## Features

- ✅ Fetches teams from multiple leagues via API-Football
- ✅ Deduplicates teams based on team ID
- ✅ Identifies teams with incomplete venue data
- ✅ Uses Anthropic Claude to search for missing venue information
- ✅ Outputs clean, enriched data to `new-data.json`

## Prerequisites

1. **Node.js** installed on your system
2. **Anthropic API Key** - Set as environment variable
3. **@anthropic-ai/sdk** package installed

## Installation

Install the required package if not already installed:

```bash
npm install @anthropic-ai/sdk
```

## Setup

### Set your Anthropic API Key

```bash
# On macOS/Linux
export ANTHROPIC_API_KEY='your-api-key-here'

# On Windows (Command Prompt)
set ANTHROPIC_API_KEY=your-api-key-here

# On Windows (PowerShell)
$env:ANTHROPIC_API_KEY='your-api-key-here'
```

## Usage

### Method 1: Using a JSON file (Recommended)

1. Create a `league-ids.json` file in the scripts directory:

```json
[
  978,
  979,
  980,
  981
]
```

2. Run the script:

```bash
node fetch-and-enrich-teams.js
```

### Method 2: Using command line arguments

```bash
node fetch-and-enrich-teams.js 978 979 980 981
```

## How It Works

### Step 1: Fetch Teams
The script calls the API-Football endpoint for each league ID:
```
https://v3.football.api-sports.io/teams?league={leagueId}&season=2024
```

### Step 2: Deduplicate
Teams are deduplicated based on their `team.id` to ensure no duplicates in the final output.

### Step 3: Identify Missing Venues
The script checks each team for complete venue data:
- venue.id
- venue.name
- venue.address
- venue.city

### Step 4: Enrich with Anthropic
For teams with incomplete venue data, the script uses Claude to search for:
- Stadium name
- Address
- City
- Capacity

### Step 5: Save Results
The final enriched data is saved to `new-data.json`

## Output Format

The `new-data.json` file contains an array of team objects:

```json
[
  {
    "team": {
      "id": 577,
      "name": "FK Kukesi",
      "code": "KUK",
      "country": "Albania",
      "founded": 1930,
      "national": false,
      "logo": "https://media.api-sports.io/football/teams/577.png"
    },
    "venue": {
      "id": 19194,
      "name": "Kukës Arena",
      "address": "Rruga Stadiumi",
      "city": "Kukës",
      "capacity": 6200,
      "surface": "grass",
      "image": "https://media.api-sports.io/football/venues/19194.png"
    }
  }
]
```

## Configuration

You can modify these constants in the script:

- `API_FOOTBALL_BASE_URL` - API-Football base URL
- `API_FOOTBALL_KEY` - Your API-Football key (update in the script)
- `SEASON` - The season to fetch (default: 2024)

## Rate Limiting

The script includes delays to respect API rate limits:
- 500ms delay between API-Football requests
- 2000ms delay between Anthropic API requests

## Troubleshooting

### "ANTHROPIC_API_KEY environment variable is not set"
Make sure you've exported your Anthropic API key as an environment variable.

### API-Football rate limit errors
If you hit rate limits, increase the delay in the `fetchAllTeams` function.

### Missing venue data after enrichment
Some teams may not have publicly available venue information. The script will log errors for teams it couldn't enrich.

## Examples

### Fetch teams from Spanish Segunda División
```bash
node fetch-and-enrich-teams.js 141
```

### Fetch teams from multiple leagues
```bash
node fetch-and-enrich-teams.js 141 142 143
```

### Using a file for many leagues
Create `league-ids.json`:
```json
[141, 142, 143, 144, 145]
```

Run:
```bash
node fetch-and-enrich-teams.js
```

## Notes

- The script assigns venue IDs starting from 900000 for venues that don't have an ID
- All enriched venues default to "grass" surface if not specified
- The script preserves existing venue data and only fills in missing fields
- Progress is logged to the console with emoji indicators for easy monitoring
