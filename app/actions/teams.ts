'use server'

import { supabase, Team } from '@/lib/supabase';

export async function getAllTeams(): Promise<{
  teams: Team[];
  venues: Team[];
}> {
  if (process.env.NODE_ENV === 'development') {
    return {
      teams: Object.values(require('../../data/teams'))[0],
      venues: Object.values(require('../../data/venues'))[0],
    };
  }

  return require('../../data/teams.json');

  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching teams:', error);
    throw new Error('Failed to fetch teams');
  }

  return data || [];
}

export async function getTeamsByCountry(country: string): Promise<Team[]> {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('country', country)
    .order('name');

  if (error) {
    console.error('Error fetching teams by country:', error);
    throw new Error('Failed to fetch teams');
  }

  return data || [];
}

export async function getTeamById(id: string): Promise<Team | null> {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching team:', error);
    return null;
  }

  return data;
}
