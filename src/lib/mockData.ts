import { JosaaEntry, AktuEntry } from './types';

export const mockJosaaData: JosaaEntry[] = [
  {
    id: 1,
    institute: "Indian Institute of Technology Bombay",
    program: "Computer Science and Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 1,
    closing_rank: 123
  },
  {
    id: 2,
    institute: "Indian Institute of Technology Delhi",
    program: "Computer Science and Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 124,
    closing_rank: 225
  },
  {
    id: 3,
    institute: "Indian Institute of Technology Madras",
    program: "Computer Science and Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 226,
    closing_rank: 350
  },
  {
    id: 4,
    institute: "Indian Institute of Technology Kanpur",
    program: "Computer Science and Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 351,
    closing_rank: 450
  },
  {
    id: 5,
    institute: "Indian Institute of Technology Kharagpur",
    program: "Computer Science and Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 451,
    closing_rank: 550
  },
  {
    id: 6,
    institute: "Indian Institute of Technology Bombay",
    program: "Electrical Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 551,
    closing_rank: 1100
  },
  {
    id: 7,
    institute: "Indian Institute of Technology Delhi",
    program: "Electrical Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 1101,
    closing_rank: 1600
  },
  {
    id: 8,
    institute: "Indian Institute of Technology Madras",
    program: "Electrical Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 1601,
    closing_rank: 2200
  },
  {
    id: 9,
    institute: "Indian Institute of Technology Kanpur",
    program: "Mechanical Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 2201,
    closing_rank: 3500
  },
  {
    id: 10,
    institute: "Indian Institute of Technology Kharagpur",
    program: "Mechanical Engineering",
    seat_type: "OPEN",
    gender: "Gender-Neutral",
    opening_rank: 3501,
    closing_rank: 4500
  },
  {
    id: 11,
    institute: "Indian Institute of Technology Bombay",
    program: "Computer Science and Engineering",
    seat_type: "OBC-NCL",
    gender: "Gender-Neutral",
    opening_rank: 1,
    closing_rank: 65
  },
  {
    id: 12,
    institute: "Indian Institute of Technology Delhi",
    program: "Computer Science and Engineering",
    seat_type: "OBC-NCL",
    gender: "Gender-Neutral",
    opening_rank: 66,
    closing_rank: 120
  }
];

export const mockAktuData: AktuEntry[] = [
  {
    id: 1,
    round: 1,
    institute: "Harcourt Butler Technical University",
    program: "B.Tech",
    stream: "Computer Science and Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Male",
    opening_rank: 1,
    closing_rank: 1000
  },
  {
    id: 2,
    round: 1,
    institute: "Harcourt Butler Technical University",
    program: "B.Tech",
    stream: "Computer Science and Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Female",
    opening_rank: 1,
    closing_rank: 1500
  },
  {
    id: 3,
    round: 1,
    institute: "Dr. A.P.J. Abdul Kalam Technical University",
    program: "B.Tech",
    stream: "Computer Science and Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Male",
    opening_rank: 1001,
    closing_rank: 2000
  },
  {
    id: 4,
    round: 1,
    institute: "Dr. A.P.J. Abdul Kalam Technical University",
    program: "B.Tech",
    stream: "Computer Science and Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Female",
    opening_rank: 1501,
    closing_rank: 2500
  },
  {
    id: 5,
    round: 1,
    institute: "Bundelkhand Institute of Engineering & Technology",
    program: "B.Tech",
    stream: "Computer Science and Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Male",
    opening_rank: 2001,
    closing_rank: 3000
  },
  {
    id: 6,
    round: 1,
    institute: "Bundelkhand Institute of Engineering & Technology",
    program: "B.Tech",
    stream: "Computer Science and Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Female",
    opening_rank: 2501,
    closing_rank: 3500
  },
  {
    id: 7,
    round: 1,
    institute: "Harcourt Butler Technical University",
    program: "B.Tech",
    stream: "Electrical Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Male",
    opening_rank: 3001,
    closing_rank: 4000
  },
  {
    id: 8,
    round: 1,
    institute: "Harcourt Butler Technical University",
    program: "B.Tech",
    stream: "Electrical Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Female",
    opening_rank: 3501,
    closing_rank: 4500
  },
  {
    id: 9,
    round: 2,
    institute: "Harcourt Butler Technical University",
    program: "B.Tech",
    stream: "Computer Science and Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Male",
    opening_rank: 1,
    closing_rank: 1200
  },
  {
    id: 10,
    round: 2,
    institute: "Harcourt Butler Technical University",
    program: "B.Tech",
    stream: "Computer Science and Engineering",
    quota: "UPGE",
    category: "OPEN",
    gender: "Female",
    opening_rank: 1,
    closing_rank: 1700
  }
];

// Helper function to simulate API requests with mock data
export const getMockJosaaData = (
  rank: number,
  filters: {
    gender?: string | null;
    seatType?: string | null;
    program?: string | null;
  } = {}
) => {
  let filteredData = mockJosaaData.filter(entry => entry.closing_rank >= rank);

  // Apply filters
  if (filters.gender) {
    filteredData = filteredData.filter(entry => entry.gender.toLowerCase() === filters.gender);
  }

  if (filters.seatType) {
    filteredData = filteredData.filter(entry => entry.seat_type.toLowerCase() === filters.seatType);
  }

  if (filters.program) {
    filteredData = filteredData.filter(entry => entry.program.toLowerCase().includes(filters.program.toLowerCase()));
  }

  return filteredData.sort((a, b) => a.closing_rank - b.closing_rank);
};

export const getMockAktuData = (
  rank: number,
  filters: {
    gender?: string | null;
    category?: string | null;
    quota?: string | null;
    program?: string | null;
    round?: number | null;
  } = {}
) => {
  let filteredData = mockAktuData.filter(entry => entry.closing_rank >= rank);

  // Apply filters
  if (filters.gender) {
    filteredData = filteredData.filter(entry => entry.gender.toLowerCase() === filters.gender);
  }

  if (filters.category) {
    filteredData = filteredData.filter(entry => entry.category.toLowerCase() === filters.category);
  }

  if (filters.quota) {
    filteredData = filteredData.filter(entry => entry.quota.toLowerCase() === filters.quota);
  }

  if (filters.program) {
    filteredData = filteredData.filter(entry => entry.program.toLowerCase().includes(filters.program.toLowerCase()));
  }

  if (filters.round) {
    filteredData = filteredData.filter(entry => entry.round === filters.round);
  }

  return filteredData.sort((a, b) => a.closing_rank - b.closing_rank);
};

export const mockSearchColleges = (
  query: string,
  board: 'josaa' | 'aktu' | 'both' = 'both'
) => {
  if (query.length < 2) {
    return [];
  }

  const queryLower = query.toLowerCase();
  let results = [];

  if (board === 'josaa' || board === 'both') {
    const josaaResults = mockJosaaData.filter(
      entry => entry.institute.toLowerCase().includes(queryLower)
    );
    results = [...results, ...josaaResults];
  }

  if (board === 'aktu' || board === 'both') {
    const aktuResults = mockAktuData.filter(
      entry => entry.institute.toLowerCase().includes(queryLower)
    );
    results = [...results, ...aktuResults];
  }

  return results;
};

export const mockFetchCollegeDetails = (
  collegeName: string,
  board: 'josaa' | 'aktu' | 'both' = 'both'
) => {
  const collegeNameLower = collegeName.toLowerCase();
  const results = {
    josaa: null,
    aktu: null
  };

  if (board === 'josaa' || board === 'both') {
    const josaaResults = mockJosaaData.filter(
      entry => entry.institute.toLowerCase().includes(collegeNameLower)
    );
    results.josaa = josaaResults.length > 0 ? josaaResults : null;
  }

  if (board === 'aktu' || board === 'both') {
    const aktuResults = mockAktuData.filter(
      entry => entry.institute.toLowerCase().includes(collegeNameLower)
    );
    results.aktu = aktuResults.length > 0 ? aktuResults : null;
  }

  return results;
};
