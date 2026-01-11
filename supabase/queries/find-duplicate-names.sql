-- Find all teams that share the same name with other teams
-- Useful for identifying teams that need stadium in their ID

SELECT
  name,
  COUNT(*) as team_count,
  json_agg(
    json_build_object(
      'id', id,
      'country', country,
      'city', city,
      'stadium', stadium,
      'crest', crest
    ) ORDER BY country, city
  ) as teams
FROM teams
GROUP BY name
HAVING COUNT(*) > 1
ORDER BY team_count DESC, name;

-- Alternative: Show all individual teams with duplicate names in a flat list
-- SELECT
--   t.name,
--   t.id,
--   t.country,
--   t.city,
--   t.stadium,
--   t.crest
-- FROM teams t
-- WHERE t.name IN (
--   SELECT name
--   FROM teams
--   GROUP BY name
--   HAVING COUNT(*) > 1
-- )
-- ORDER BY t.name, t.country, t.city;
