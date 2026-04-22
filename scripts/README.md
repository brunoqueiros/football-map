# Team and Venue Conversion Script

This script converts a combined teams+venues JSON file into two separate files:
- One for teams (with venue_id references)
- One for unique venues (with geocoded coordinates)

## Prerequisites

1. Get a Google Maps API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the **Places API** (required - most accurate)
   - Enable the **Geocoding API** (fallback)
   - Create an API key

## Usage

```bash
# Set your Google API key and run the script
GOOGLE_MAPS_API_KEY=your_api_key_here node scripts/convert-teams-venues.js input.json
```

**Example:**
```bash
GOOGLE_MAPS_API_KEY=AIzaSyC... node scripts/convert-teams-venues.js data/brazil.json
```

This will create:
- `data/brazil-teams.json` - Teams with venue_id references
- `data/brazil-venues.json` - Unique venues with lat/lng coordinates
- `data/brazil-venues-verify.csv` - Verification file with Google Maps links

## Input Format

The input JSON should be an array of objects with `team` and `venue` properties:

```json
[
  {
    "team": {
      "id": 118,
      "name": "Bahia",
      "code": "BAH",
      "country": "Brazil",
      "founded": 1931,
      "national": false,
      "logo": "https://..."
    },
    "venue": {
      "id": 216,
      "name": "Arena Fonte Nova",
      "address": "Rua Lions Club, Nazaré",
      "city": "Salvador, Bahia",
      "capacity": 56500,
      "surface": "grass",
      "image": "https://..."
    }
  }
]
```

## Output Format

**Teams:**
```json
[
  {
    "id": 118,
    "name": "Bahia",
    "code": "BAH",
    "country": "Brazil",
    "founded": 1931,
    "national": false,
    "logo": "https://...",
    "venue_id": 216
  }
]
```

**Venues:**
```json
[
  {
    "id": 216,
    "name": "Arena Fonte Nova",
    "city": "Salvador",
    "capacity": 56500,
    "latitude": -12.9786,
    "longitude": -38.5042
  }
]
```

## Features

- ✓ Automatically deduplicates venues (e.g., shared stadiums like Maracanã)
- ✓ **Smart 3-tier search strategy**:
  1. Google Places API (most accurate for stadiums/landmarks)
  2. Geocoding API by stadium name
  3. Geocoding API by full address (fallback)
- ✓ Extracts city names (removes state/region)
- ✓ Rate limiting to avoid API throttling (200ms delay between requests)
- ✓ **Verification CSV**: Outputs a CSV file with Google Maps links to verify accuracy
- ✓ Progress indicators during geocoding

## Notes

- The script uses **Google Places API first** (same as Google Maps search), which gives the most accurate coordinates for stadiums
- Falls back to Geocoding API if Places API doesn't find the venue
- Adds a 200ms delay between API requests to respect rate limits
- If all methods fail, it will log a warning and set lat/lng to null
- City names are cleaned (e.g., "São Paulo, São Paulo" becomes "São Paulo")

## Verifying Coordinates

The script outputs a CSV file (`*-venues-verify.csv`) with Google Maps links for each venue.

**To verify:**
1. Open the CSV file in Excel or Google Sheets
2. Click the Google Maps links in the last column
3. Check if the pin is on the actual stadium
4. If incorrect, manually find the stadium in Google Maps and copy the correct coordinates

**To manually override coordinates:**
Simply edit the `*-venues.json` file and replace the `latitude` and `longitude` values.

**Example:**
```json
{
  "id": 7359,
  "name": "Estádio José de Melo",
  "city": "Rio Branco",
  "capacity": 6000,
  "latitude": -9.970144687975605,  // ← Update this
  "longitude": -67.80774193082681  // ← Update this
}
```
