-- Teams/Stadiums table
CREATE TABLE teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  stadium TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  capacity INTEGER,
  tier TEXT,
  crest TEXT, -- Original ID from teams.json, used for logo file path
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_teams_country ON teams(country);
CREATE INDEX idx_teams_tier ON teams(tier);
CREATE INDEX idx_teams_name ON teams(name);

-- Index for spatial queries (optional, useful for nearby searches)
CREATE INDEX idx_teams_lat ON teams(latitude);
CREATE INDEX idx_teams_lng ON teams(longitude);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON teams FOR SELECT
  TO public
  USING (true);

-- Optional: Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
