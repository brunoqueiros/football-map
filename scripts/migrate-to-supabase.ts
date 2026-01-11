import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import teams from '../data/teams-new.json';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service key for admin operations

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate ID from country + name
function generateId(country: string, name: string): string {
  const combined = `${country}-${name}`;
  return combined
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace special chars and spaces with hyphens
    .replace(/^-+|-+$/g, '')      // Remove leading/trailing hyphens
    .replace(/-+/g, '-');          // Replace multiple consecutive hyphens with single
}

async function migrateTeams() {
  console.log(`Starting migration of ${teams.length} teams...`);

  // Transform teams data
  const transformedTeams = teams.map((team: any) => ({
    id: generateId(team.country, team.name), // Generate new ID from country + name
    name: team.name,
    country: team.country,
    city: team.city,
    stadium: team.stadium,
    latitude: team.latitude,
    longitude: team.longitude,
    capacity: team.capacity,
    tier: team.tier,
    crest: team.id // Store original ID for logo file path
  }));

  console.log('Example ID transformation:');
  console.log(`  Original: ${teams[0].id}`);
  console.log(`  New ID: ${transformedTeams[0].id}`);
  console.log(`  Crest: ${transformedTeams[0].crest}`);

  // Batch insert in chunks of 100 to avoid hitting limits
  const chunkSize = 100;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < transformedTeams.length; i += chunkSize) {
    const chunk = transformedTeams.slice(i, i + chunkSize);

    const { data, error } = await supabase
      .from('teams')
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.error(`Error inserting chunk ${i / chunkSize + 1}:`, error);
      errorCount += chunk.length;
    } else {
      successCount += chunk.length;
      console.log(`✓ Inserted chunk ${i / chunkSize + 1} (${Math.min(i + chunkSize, transformedTeams.length)}/${transformedTeams.length})`);
    }
  }

  console.log('\nMigration complete!');
  console.log(`✓ Successfully migrated: ${successCount} teams`);
  if (errorCount > 0) {
    console.log(`✗ Failed: ${errorCount} teams`);
  }
}

migrateTeams().catch(console.error);
