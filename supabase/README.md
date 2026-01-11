# Supabase Setup Guide

This guide will help you migrate your teams data from JSON to Supabase.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to finish setting up (takes ~2 minutes)

## 2. Run the Schema

1. In your Supabase project dashboard, go to the **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste it into the SQL Editor and click **Run**

This will create:
- `teams` table with all required columns
- Indexes for better query performance
- Row Level Security (RLS) policy for public read access
- Auto-update trigger for `updated_at` column

## 3. Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (safe for client-side)
   - **service_role key**: `eyJhbGc...` (keep secret!)

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

## 5. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## 6. Migrate Your Data

Run the migration script to transfer data from `teams.json` to Supabase:

```bash
npm run migrate
```

This will:
- Read all teams from `data/teams.json`
- Generate new IDs from `country + name` (e.g., "Brazil" + "Corinthians" → "brazil-corinthians")
- Store the original ID in the `crest` field (used for logo file paths)
- Insert them into Supabase in batches of 100
- Show progress and report any errors

**ID Generation Strategy:**
- New `id`: Generated from country + name (lowercase, spaces/special chars → hyphens)
- `crest` field: Stores the original JSON ID for referencing logo files in `/public/logos/`

## 7. Verify the Migration

1. Go to your Supabase dashboard → **Table Editor**
2. Select the `teams` table
3. You should see all your teams data

## 8. Update Your Application

The server-side data fetching is already set up in `app/actions/teams.ts`. You can now use:

```typescript
import { getAllTeams } from '@/app/actions/teams';

// In your server component or page
const teams = await getAllTeams();
```

## Performance Notes

- With ~2,000 teams, the initial fetch will return ~400-600KB of JSON
- Data is cached on the client after first load
- Consider adding ISR (Incremental Static Regeneration) with `revalidate`:

```typescript
// In your page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const teams = await getAllTeams();
  return <MapContainer teams={teams} />;
}
```

## Optional: Add a Search Index

If you want full-text search capabilities:

```sql
-- Add a generated tsvector column for full-text search
ALTER TABLE teams ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(city, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(country, '')), 'C')
  ) STORED;

CREATE INDEX idx_teams_search ON teams USING GIN(search_vector);
```

Then you can search with:

```typescript
const { data } = await supabase
  .from('teams')
  .select('*')
  .textSearch('search_vector', 'manchester');
```
