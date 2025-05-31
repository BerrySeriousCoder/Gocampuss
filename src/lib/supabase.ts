
import { createClient } from '@supabase/supabase-js';

// Note: In a production app, these would be stored in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchJosaaData = async (
  rank: number,
  filters: {
    gender?: string | null;
    category?: string | null;
    seatType?: string | null;
    program?: string | null;
  } = {}
) => {
  console.log('[SupabaseDataFetching] fetchJosaaData called with rank:', rank, 'filters:', filters);
  const { gender, category, seatType, program } = filters;
  
  let supabaseQuery = supabase
    .from('josaa')
    .select('*')
    .lte('closing_rank', rank)
    .order('closing_rank', { ascending: true });
    
  // JOSAA specific gender constants from your data
  const JOSAA_GENDER_NEUTRAL = 'Gender-Neutral';
  const JOSAA_FEMALE_ONLY = 'Female-only (including Supernumerary)';

  if (gender) {
    if (gender.toLowerCase() === 'male') {
      supabaseQuery = supabaseQuery.eq('gender', JOSAA_GENDER_NEUTRAL);
    } else if (gender.toLowerCase() === 'female') {
      supabaseQuery = supabaseQuery.or(`gender.eq.${JOSAA_GENDER_NEUTRAL},gender.eq.${JOSAA_FEMALE_ONLY}`);
    } else {
      supabaseQuery = supabaseQuery.eq('gender', gender);
    }
  }

  const josaaSeatTypeFilter = seatType || category;
  if (josaaSeatTypeFilter) {
    supabaseQuery = supabaseQuery.eq('seat_type', josaaSeatTypeFilter);
  }
  
  if (program) {
    console.log('[SupabaseDataFetching] fetchJosaaData FTS program search:', program);
    supabaseQuery = supabaseQuery.textSearch('fts_document', program, {
      config: 'english',
      type: 'websearch'
    });
  }
  
  console.log('[SupabaseDataFetching] fetchJosaaData: Executing Supabase query.');
  const { data, error } = await supabaseQuery;
  
  if (error) {
    console.error('[SupabaseDataFetching] Error fetching JOSAA data:', error);
    return [];
  }
  console.log('[SupabaseDataFetching] fetchJosaaData received data count:', data?.length);
  return data;
};

export const fetchAktuData = async (
  rank: number,
  filters: {
    gender?: string | null;
    category?: string | null;
    quota?: string | null;
    program?: string | null;
    round?: number | null;
  } = {}
) => {
  console.log('[SupabaseDataFetching] fetchAktuData called with rank:', rank, 'filters:', filters);
  const { gender, category, quota, program, round } = filters;
  
  let supabaseQuery = supabase
    .from('aktu')
    .select('*, city') // Ensure city is selected if not covered by '*' or if explicitly needed
    .gte('closing_rank', rank) // User's rank must be less than or equal to the closing rank
    .order('closing_rank', { ascending: true });

  // AKTU specific seat_gender constants from CSV
  const AKTU_NEUTRAL_SEAT = 'Neutral';
  const AKTU_FEMALE_ONLY_SEAT = 'Female';
    
  if (gender) {
    const userGenderFilter = gender.toLowerCase();
    if (userGenderFilter === 'male') {
      supabaseQuery = supabaseQuery.eq('seat_gender', AKTU_NEUTRAL_SEAT);
    } else if (userGenderFilter === 'female') {
      supabaseQuery = supabaseQuery.in('seat_gender', [AKTU_NEUTRAL_SEAT, AKTU_FEMALE_ONLY_SEAT]);
    }
    // If gender filter is something else, it won't apply, which is fine.
    // Or, if direct values like 'Neutral' are passed, this logic would need adjustment,
    // but typical UI would send 'male'/'female'.
  }
  
  if (category) {
    supabaseQuery = supabaseQuery.eq('category', category);
  }
  
  if (quota) {
    supabaseQuery = supabaseQuery.eq('quota', quota);
  }
  
  if (program) {
    console.log('[SupabaseDataFetching] fetchAktuData FTS program search:', program);
    supabaseQuery = supabaseQuery.textSearch('fts_document', program, {
      config: 'english',
      type: 'websearch'
    });
  }
  
  if (round) {
    supabaseQuery = supabaseQuery.eq('round', round);
  }
  
  console.log('[SupabaseDataFetching] fetchAktuData: Executing Supabase query.');
  const { data, error } = await supabaseQuery;
  
  if (error) {
    console.error('[SupabaseDataFetching] Error fetching AKTU data:', error);
    return [];
  }
  console.log('[SupabaseDataFetching] fetchAktuData received data count:', data?.length);
  return data;
};

export const fetchPaginatedAktuColleges = async (
  page: number,
  itemsPerPage: number,
  filters: {
    gender?: string | null;
    category?: string | null;
    quota?: string | null;
    program?: string | null;
    round?: number | null;
  } = {}
) => {
  console.log('[SupabaseDataFetching] fetchPaginatedAktuColleges called with page:', page, 'itemsPerPage:', itemsPerPage, 'filters:', filters);
  const { gender, category, quota, program, round } = filters;
  const offset = (page - 1) * itemsPerPage;

  let supabaseQuery = supabase
    .from('aktu')
    .select('*', { head: false, count: 'exact' }) // Request count for pagination
    .order('institute', { ascending: true }) // Order by institute name for consistent pagination
    .range(offset, offset + itemsPerPage - 1);

  // Apply filters if present
  const AKTU_NEUTRAL_SEAT = 'Neutral';
  const AKTU_FEMALE_ONLY_SEAT = 'Female';

  if (gender) {
    const userGenderFilter = gender.toLowerCase();
    if (userGenderFilter === 'male') {
      supabaseQuery = supabaseQuery.eq('seat_gender', AKTU_NEUTRAL_SEAT);
    } else if (userGenderFilter === 'female') {
      supabaseQuery = supabaseQuery.in('seat_gender', [AKTU_NEUTRAL_SEAT, AKTU_FEMALE_ONLY_SEAT]);
    }
  }

  if (category) {
    supabaseQuery = supabaseQuery.eq('category', category);
  }

  if (quota) {
    supabaseQuery = supabaseQuery.eq('quota', quota);
  }

  if (program) {
    supabaseQuery = supabaseQuery.textSearch('fts_document', program, {
      config: 'english',
      type: 'websearch'
    });
  }

  if (round) {
    supabaseQuery = supabaseQuery.eq('round', round);
  }

  console.log('[SupabaseDataFetching] fetchPaginatedAktuColleges: Executing Supabase query.');
  const { data, error, count } = await supabaseQuery;

  if (error) {
    console.error('[SupabaseDataFetching] Error fetching paginated AKTU data:', error);
    return { data: [], count: 0 };
  }
  console.log('[SupabaseDataFetching] fetchPaginatedAktuColleges received data count:', data?.length, 'total count:', count);
  return { data: data || [], count: count || 0 };
};

export const searchColleges = async (
  query: string,
  board: 'josaa' | 'aktu' | 'both' = 'both',
  page: number = 1,
  itemsPerPage: number = 10,
  filters: { // Added filters parameter
    gender?: string | null;
    category?: string | null;
    quota?: string | null;
    program?: string | null;
    round?: number | null;
  } = {}
) => {
  console.log('[SupabaseDataFetching] searchColleges called with query:', query, 'board:', board, 'page:', page, 'itemsPerPage:', itemsPerPage, 'filters:', filters);
  const { gender, category, quota, program, round } = filters; // Destructure filters
  const offset = (page - 1) * itemsPerPage;

  let aktuResults: any[] = [];
  let totalCount = 0;

  if (board === 'josaa') {
    console.log('[SupabaseDataFetching] searchColleges: JOSAA search is temporarily disabled, returning empty array.');
    return { data: [], count: 0 };
  }

  if (board === 'aktu' || board === 'both') {
    console.log('[SupabaseDataFetching] searchColleges: Querying AKTU.');
    let supabaseQuery = supabase
      .from('aktu')
      .select('*', { head: false, count: 'exact' })
      .textSearch('fts_document', query, {
        type: 'websearch',
        config: 'english'
      })
      .order('institute', { ascending: true })
      .range(offset, offset + itemsPerPage - 1);

    // Apply filters to search query
    const AKTU_NEUTRAL_SEAT = 'Neutral';
    const AKTU_FEMALE_ONLY_SEAT = 'Female';

    if (gender) {
      const userGenderFilter = gender.toLowerCase();
      if (userGenderFilter === 'male') {
        supabaseQuery = supabaseQuery.eq('seat_gender', AKTU_NEUTRAL_SEAT);
      } else if (userGenderFilter === 'female') {
        supabaseQuery = supabaseQuery.in('seat_gender', [AKTU_NEUTRAL_SEAT, AKTU_FEMALE_ONLY_SEAT]);
      }
    }

    if (category) {
      supabaseQuery = supabaseQuery.eq('category', category);
    }

    if (quota) {
      supabaseQuery = supabaseQuery.eq('quota', quota);
    }

    // Note: program filter is already handled by textSearch for the main query
    // if (program) {
    //   supabaseQuery = supabaseQuery.textSearch('fts_document', program, {
    //     config: 'english',
    //     type: 'websearch'
    //   });
    // }

    if (round) {
      supabaseQuery = supabaseQuery.eq('round', round);
    }
      
    const { data, error, count } = await supabaseQuery; // Execute the filtered query
      
    if (error) {
      console.error('[SupabaseDataFetching] Error searching AKTU colleges with FTS:', error);
    } else {
      aktuResults = data || [];
      totalCount = count || 0;
      console.log('[SupabaseDataFetching] searchColleges AKTU results count:', aktuResults.length, 'total count:', totalCount);
    }
    return { data: aktuResults, count: totalCount };
  }
  
  console.log('[SupabaseDataFetching] searchColleges: Invalid board type, returning empty.');
  return { data: [], count: 0 };
};

export const fetchCollegeDetails = async (
  collegeName: string,
  board: 'josaa' | 'aktu' | 'both' = 'both'
) => {
  const results = {
    josaa: null,
    aktu: null
  };

  if (board === 'josaa') {
    console.log('[SupabaseDataFetching] fetchCollegeDetails: JOSAA details are temporarily disabled.');
    results.josaa = null; // Explicitly set to null
  }

  // For 'aktu' or 'both', we attempt to fetch AKTU details
  if (board === 'aktu' || board === 'both') {
    console.log('[SupabaseDataFetching] fetchCollegeDetails: Fetching AKTU details for', collegeName);
    const { data: aktuData, error: aktuError } = await supabase
      .from('aktu')
      .select('*')
      // Using ilike for details page is okay, or could use FTS if collegeName is less precise
      .ilike('institute', `%${collegeName}%`);
      
    if (aktuError) {
      console.error('[SupabaseDataFetching] Error fetching AKTU college details:', aktuError);
    } else {
      results.aktu = aktuData;
      console.log('[SupabaseDataFetching] fetchCollegeDetails: AKTU details count:', aktuData?.length);
    }
    // If board was 'both', we still don't fetch josaa for now.
    if (board === 'both') {
        results.josaa = null;
    }
  }
  
  console.log('[SupabaseDataFetching] fetchCollegeDetails returning:', results);
  return results;
};
