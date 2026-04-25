const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Known placeholder image hashes (MD5)
const PLACEHOLDER_HASHES = new Set([
  'a3208b617675b595f3d1a11c7d6642fb', // placeholder-1.png (88K)
  'fbe651acfa5699e1adbb938d7cc728d3',  // placeholder-2.png (6.6K)
  '68ac0d5773da5ee81444ade70d89533d',
]);

// Path to default crest image
const DEFAULT_CREST_PATH = path.join(__dirname, 'default-crest.svg');

/**
 * Downloads an image from a URL and returns it as a buffer
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: HTTP ${res.statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Computes MD5 hash of a buffer
 */
function computeHash(buffer) {
  return crypto.createHash('md5').update(buffer).digest('hex');
}

/**
 * Checks if an image is a known placeholder by comparing its hash
 */
function isGenericPlaceholder(imageBuffer) {
  const hash = computeHash(imageBuffer);
  return PLACEHOLDER_HASHES.has(hash);
}

/**
 * Loads the default crest image
 */
function loadDefaultCrest() {
  if (!fs.existsSync(DEFAULT_CREST_PATH)) {
    throw new Error(`Default crest image not found at: ${DEFAULT_CREST_PATH}`);
  }
  return fs.readFileSync(DEFAULT_CREST_PATH);
}

/**
 * Saves image buffer to a PNG file
 */
function saveImage(buffer, outputPath) {
  fs.writeFileSync(outputPath, buffer);
}

/**
 * Fetches and validates a single team crest
 */
async function fetchTeamCrest(team, outputDir) {
  const teamId = team.id;
  const teamName = team.name;
  const country = team.country;
  const crestUrl = team.logo;
  const outputPath = path.join(outputDir, `${teamId}.png`);

  console.log(`\n[Team ${teamId}] ${teamName} (${country})`);
  console.log(`  → Downloading from: ${crestUrl}`);

  try {
    // Step 1: Download the image from the provided URL
    const imageBuffer = await downloadImage(crestUrl);
    console.log('  ✓ Downloaded');

    // Step 2: Check if it's a generic placeholder
    console.log('  → Checking if valid crest...');
    const isPlaceholder = isGenericPlaceholder(imageBuffer);

    if (!isPlaceholder) {
      console.log('  ✓ Valid crest - saving');
      saveImage(imageBuffer, outputPath);
      return { success: true, usedFallback: false };
    }

    // Step 3: If it's a placeholder, use default crest
    console.log('  ⚠️  Generic placeholder detected');
    console.log('  → Using default shield crest');

    const defaultCrestBuffer = loadDefaultCrest();
    saveImage(defaultCrestBuffer, outputPath.replace('png', 'svg'));
    return { success: true, usedFallback: true };

  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Main CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: node fetch-team-crest.js <teamsJsonFile> [outputDir]');
    console.log('\nExamples:');
    console.log('  node fetch-team-crest.js sample-input-teams.json');
    console.log('  node fetch-team-crest.js sample-input-teams.json ./crests');
    process.exit(1);
  }

  const teamsFile = args[0];
  const outputDir = args[1] || path.join(__dirname, 'crests');

  // Validate input file
  if (!fs.existsSync(teamsFile)) {
    console.error(`Error: File not found: ${teamsFile}`);
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load teams data
  console.log('\n⚽ Football Team Crest Fetcher');
  console.log('================================');
  console.log(`Input file: ${teamsFile}`);
  console.log(`Output directory: ${outputDir}`);

  let teams;
  try {
    const fileContent = fs.readFileSync(teamsFile, 'utf8');
    teams = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
    process.exit(1);
  }

  if (!Array.isArray(teams)) {
    console.error('Error: JSON file must contain an array of teams');
    process.exit(1);
  }

  console.log(`\nFound ${teams.length} teams to process\n`);

  // Process each team
  const results = {
    total: teams.length,
    successful: 0,
    failed: 0,
    usedFallback: 0
  };

  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    console.log(`\n[${i + 1}/${teams.length}] Processing team...`);

    const result = await fetchTeamCrest(team, outputDir);

    if (result.success) {
      results.successful++;
      if (result.usedFallback) {
        results.usedFallback++;
      }
    } else {
      results.failed++;
    }

    // Add delay to respect rate limits
    if (i < teams.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Print summary
  console.log('\n\n📊 Summary');
  console.log('================================');
  console.log(`Total teams: ${results.total}`);
  console.log(`✓ Successful: ${results.successful}`);
  console.log(`⚠️  Used fallback/placeholder: ${results.usedFallback}`);
  console.log(`✗ Failed: ${results.failed}`);
  console.log(`\nCrests saved to: ${outputDir}`);

  if (results.failed === 0) {
    console.log('\n✅ All crests fetched successfully!');
  } else {
    console.log(`\n⚠️  Completed with ${results.failed} errors`);
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
}

// Export functions for use in other scripts
module.exports = {
  fetchTeamCrest,
  downloadImage,
  isGenericPlaceholder,
  computeHash,
  loadDefaultCrest,
  saveImage
};
