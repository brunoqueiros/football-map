const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv');

dotenv.config();

// Google Geocoding API key - set this as an environment variable
const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('Error: GOOGLE_MAPS_API_KEY environment variable is not set');
  console.error('Usage: GOOGLE_MAPS_API_KEY=your_key_here node convert-teams-venues.js input.json');
  process.exit(1);
}

// Function to search using Google Places API (more accurate for stadiums)
async function searchPlace(venueName, city) {
  const query = encodeURIComponent(`${venueName}, ${city}`);
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,geometry&key=${GOOGLE_API_KEY}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.status === 'OK' && result.candidates && result.candidates.length > 0) {
            const place = result.candidates[0];
            resolve({
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
              name: place.name,
              placeId: place.place_id
            });
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Function to call Google Geocoding API (fallback)
async function geocodeAddress(address, city) {
  const query = encodeURIComponent(`${address}, ${city}`);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GOOGLE_API_KEY}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.status === 'OK' && result.results.length > 0) {
            const location = result.results[0].geometry.location;
            resolve({ lat: location.lat, lng: location.lng });
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Main function to get coordinates (tries Places API first, then Geocoding)
async function getCoordinates(venueName, address, city) {
  // Try 1: Google Places API (most accurate for stadiums/POIs)
  console.log(`  → Searching Places API...`);
  const placeResult = await searchPlace(venueName, city);

  if (placeResult) {
    console.log(`  ✓ Found via Places API: ${placeResult.name}`);
    return { lat: placeResult.lat, lng: placeResult.lng, method: 'places' };
  }

  // Try 2: Geocoding API with stadium name + city
  console.log(`  → Places API failed, trying Geocoding API...`);
  await delay(200); // Rate limiting

  let geocodeResult = await geocodeAddress(`${venueName}, ${city}`, '');
  if (geocodeResult) {
    console.log(`  ✓ Found via Geocoding (name)`);
    return { lat: geocodeResult.lat, lng: geocodeResult.lng, method: 'geocode_name' };
  }

  // Try 3: Geocoding API with full address
  if (address) {
    console.log(`  → Trying with full address...`);
    await delay(200); // Rate limiting
    geocodeResult = await geocodeAddress(address, city);
    if (geocodeResult) {
      console.log(`  ✓ Found via Geocoding (address)`);
      return { lat: geocodeResult.lat, lng: geocodeResult.lng, method: 'geocode_address' };
    }
  }

  console.warn(`  ✗ All methods failed`);
  return { lat: null, lng: null, method: 'failed' };
}

// Function to extract city name (remove state/region)
function extractCity(cityString) {
  // Split by comma and take the first part
  return cityString.split(',')[0].trim();
}

// Function to delay between API calls to respect rate limits
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main conversion function
async function convertTeamsVenues(inputFile) {
  console.log(`Reading input file: ${inputFile}`);

  const rawData = fs.readFileSync(inputFile, 'utf8');
  const data = JSON.parse(rawData);

  const teams = [];
  const venuesMap = new Map();

  // First pass: extract teams and collect unique venues
  console.log('\nProcessing teams and venues...');
  for (const item of data) {
    const { team, venue } = item;

    // Add team with venue_id reference
    teams.push({
      id: team.id,
      name: team.name,
      code: team.code,
      country: team.country,
      founded: team.founded,
      national: team.national,
      logo: team.logo,
      venue_id: venue.id
    });

    // Collect unique venues
    if (!venuesMap.has(venue.id)) {
      venuesMap.set(venue.id, {
        id: venue.id,
        name: venue.name,
        address: venue.address,
        city: venue.city,
        capacity: venue.capacity
      });
    }
  }

  console.log(`\nFound ${teams.length} teams and ${venuesMap.size} unique venues`);

  // Second pass: geocode venues
  console.log('\nFetching coordinates from Google Geocoding API...');
  const venues = [];
  let count = 0;

  for (const [venueId, venueData] of venuesMap) {
    count++;
    console.log(`[${count}/${venuesMap.size}] Geocoding: ${venueData.name}...`);

    const coordinates = await getCoordinates(venueData.name, venueData.address, venueData.city);

    // Wait 200ms between requests to avoid rate limiting (only if we didn't already wait in getCoordinates)
    if (count < venuesMap.size && coordinates.method !== 'address') {
      await delay(200);
    }

    venues.push({
      id: venueData.id,
      name: venueData.name,
      city: extractCity(venueData.city),
      capacity: venueData.capacity,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    });
  }

  // Write output files
  const teamsOutputFile = inputFile.replace('.json', '-teams.json');
  const venuesOutputFile = inputFile.replace('.json', '-venues.json');
  const verificationFile = inputFile.replace('.json', '-venues-verify.csv');

  console.log('\nWriting output files...');
  fs.writeFileSync(teamsOutputFile, JSON.stringify(teams, null, 2), 'utf8');
  fs.writeFileSync(venuesOutputFile, JSON.stringify(venues, null, 2), 'utf8');

  // Create verification CSV for manual checking
  const csvHeader = 'ID,Name,City,Latitude,Longitude,Google Maps Link\n';
  const csvRows = venues.map(v => {
    const mapsLink = v.latitude && v.longitude
      ? `https://www.google.com/maps?q=${v.latitude},${v.longitude}`
      : 'N/A';
    return `${v.id},"${v.name}","${v.city}",${v.latitude || ''},${v.longitude || ''},${mapsLink}`;
  }).join('\n');
  fs.writeFileSync(verificationFile, csvHeader + csvRows, 'utf8');

  console.log(`\n✓ Teams written to: ${teamsOutputFile}`);
  console.log(`✓ Venues written to: ${venuesOutputFile}`);
  console.log(`✓ Verification CSV: ${verificationFile}`);
  console.log('\n💡 Open the CSV to verify coordinates in Google Maps');
  console.log('   Click the links to check if the pins are accurate\n');
  console.log('Done!');
}

// Run the script
const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Error: Please provide an input JSON file');
  console.error('Usage: GOOGLE_MAPS_API_KEY=your_key_here node convert-teams-venues.js input.json');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Error: File not found: ${inputFile}`);
  process.exit(1);
}

convertTeamsVenues(inputFile).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
