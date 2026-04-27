const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

/**
 * Main CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error('Usage: node fetch-team-crest.js <teamsJsonFile>');
    console.log('\nExamples:');
    console.log('  node fetch-team-crest.js sample-input-teams.json');
    console.log('  node fetch-team-crest.js sample-input-teams.json ./crests');
    process.exit(1);
  }

  const teamsFile = args[0];

  // Validate input file
  if (!fs.existsSync(teamsFile)) {
    console.error(`Error: File not found: ${teamsFile}`);
    process.exit(1);
  }

  // Load teams data
  console.log('\n⚽ Football Team Crest Fetcher');
  console.log('================================');
  console.log(`Input file: ${teamsFile}`);

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

    if (fs.existsSync(`./public/logos/${team.id}.svg`)) {
      team.logo = `${team.id}.svg`;
    } else {
      team.logo = `${team.id}.png`;
    }

    // console.log(`\n[${i + 1}/${teams.length}] Processing team...`);

    // const result = await fetchTeamCrest(team, outputDir);

    // if (result.success) {
    //   results.successful++;
    //   if (result.usedFallback) {
    //     results.usedFallback++;
    //   }
    // } else {
    //   results.failed++;
    // }

    // // Add delay to respect rate limits
    // if (i < teams.length - 1) {
    //   await new Promise(resolve => setTimeout(resolve, 2000));
    // }
  }

  fs.writeFileSync(teamsFile, JSON.stringify(teams, null, 4), 'utf8');
  // // Print summary
  // console.log('\n\n📊 Summary');
  // console.log('================================');
  // console.log(`Total teams: ${results.total}`);
  // console.log(`✓ Successful: ${results.successful}`);
  // console.log(`⚠️  Used fallback/placeholder: ${results.usedFallback}`);
  // console.log(`✗ Failed: ${results.failed}`);
  // console.log(`\nCrests saved to: ${outputDir}`);

  // if (results.failed === 0) {
  //   console.log('\n✅ All crests fetched successfully!');
  // } else {
  //   console.log(`\n⚠️  Completed with ${results.failed} errors`);
  // }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
}