'use server'

export async function getFixturesForTeam(teamId: number) {
  const fixtures: any[] = require('../../data/fixtures.json');

  return fixtures.filter(fixture => fixture.teams.home.id === teamId || fixture.teams.away.id === teamId);
}

export async function getAllTeams(): Promise<{
  teams: any[];
  venues: any[];
}> {
  return {
    teams: Object.values(require('../../data/teams')).flat(),
    venues: Object.values(require('../../data/venues')).flat(),
  } as {
    teams: any;
    venues: any;
  };
}
