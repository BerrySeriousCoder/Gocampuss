
export interface JosaaEntry {
  id: number;
  institute: string;
  academic_program_name: string;
  seat_type: string;
  gender: string;
  opening_rank: number;
  closing_rank: number;
}

export interface AktuEntry {
  id: number;
  round: number;
  institute: string;
  program: string;
  stream: string;
  quota: string;
  category: string;
  gender: string; // This is the gender from the data, which is 'Neutral' or 'Female'
  seat_gender: string; // This is the specific column for seat gender
  opening_rank: number;
  closing_rank: number;
  city: string; // Added city property
}

export interface College {
  _id: string;
  collegeName: string;
  counsellingNames: string;
  established: string;
  campus: string;
  location: string;
  nirfRanking: string;
  seatMatrix: { branch: string; seats: string }[];
  totalCSStudents: string;
  nbaBranches: string;
  cutoffs: Record<string, any>; // Using Record<string, any> for flexible cutoff structure
  hostelFees: {
    boys: string;
    girls: string;
  };
  academicFees: {
    year1: string;
    year2: string;
    year3: string;
    year4: string;
    total: string;
  };
  totalFees: string;
  placements: {
    totalStudents: string;
    totalCompanies: string;
    totalOffers: string;
    highestPackage: string;
    avgPackage: string;
    csAvgPackage: string;
    companyData: { name: string; offers: string; ctc: string; _id: string }[];
  };
  profilePic?: string;
  collegeTourImages?: string[];
  boysHostelImages?: string[];
  girlsHostelImages?: string[];
  collegeTourVideo?: string;
  studentReviewVideo?: string;
}
