
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BoardToggle from "../components/ui/BoardToggle";
import CollegeCard from "../components/ui/CollegeCard";
import FilterPanel from "../components/ui/FilterPanel";
import Loader from "../components/ui/Loader";
import { fetchJosaaData, fetchAktuData } from "../lib/supabase";
import { JosaaEntry, AktuEntry } from "../lib/types";

const SearchResults = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [board, setBoard] = useState<"aktu">("aktu"); // Default to AKTU
  const [rank, setRank] = useState<number>(0);
  const [gender, setGender] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  // Removed program and seatType states as they are not used for AKTU filters here
  const [quota, setQuota] = useState<string | null>(null);
  const [round, setRound] = useState<number | null>(null);
  
  // const [josaaResults, setJosaaResults] = useState<JosaaEntry[]>([]); // JOSAA disabled
  const [aktuResults, setAktuResults] = useState<AktuEntry[]>([]);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 9;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const rankParam = searchParams.get("rank");
    const boardParam = searchParams.get("board") as "josaa" | "aktu";
    const categoryParam = searchParams.get("category");
    const genderParam = searchParams.get("gender");
    
    if (rankParam) {
      setRank(Number(rankParam));
    }
    
    // Board defaults to AKTU, BoardToggle also enforces AKTU
    // if (boardParam && (boardParam === "josaa" || boardParam === "aktu")) {
    //   setBoard(boardParam);
    // } else {
    setBoard("aktu"); // Ensure board is AKTU
    // }
    
    if (categoryParam) {
      setCategory(categoryParam);
    }
    
    if (genderParam) {
      setGender(genderParam);
    }
    
    setCurrentPage(1);
    fetchResults();
  }, [location.search]);

  useEffect(() => {
    fetchResults();
  }, [rank, gender, category, quota, round]); // Board is fixed to AKTU, program & seatType removed
  
  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // JOSAA is disabled, only fetch AKTU data
      const data = await fetchAktuData(rank, {
        gender,
        category,
        quota,
        // program, // Program filter removed for AKTU as per requirements
        round
      });
      setAktuResults(data);
      
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Failed to load college data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (filterType: string, value: string | null) => {
    switch (filterType) {
      case "gender":
        setGender(value);
        break;
      case "category":
        setCategory(value);
        break;
      // case "program": // Removed
      //   setProgram(value);
      //   break;
      // case "seatType": // Removed
      //   setSeatType(value);
      //   break;
      case "quota":
        setQuota(value);
        break;
      case "round":
        setRound(value ? Number(value) : null);
        break;
      default:
        break;
    }
  };
  
  const handleBoardChange = (newBoard: "aktu") => { // Will only receive 'aktu'
    if (board !== newBoard) { // This will only trigger if initial state was somehow not 'aktu'
      setBoard(newBoard); // Set to AKTU
      setCurrentPage(1);
      // Reset filters relevant to AKTU if needed, though category/quota/round are generic
      setCategory(null);
      // setSeatType(null); // Removed
      setQuota(null);
      setRound(null);
    }
  };
  
  const currentResults = aktuResults; // Only AKTU results now
  
  // Calculate pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentPageResults = currentResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(currentResults.length / resultsPerPage);
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded-md ${
            currentPage === i
              ? "bg-gradient-to-r from-purple-primary to-purple-light text-white"
              : "bg-surface hover:bg-surface-border"
          }`}
        >
          {i}
        </button>
      );
    }
    
    return <div className="flex flex-wrap justify-center gap-2 mt-8">{pages}</div>;
  };

const aktuCategoryOptions = [
  { label: "OPEN", value: "OPEN" },
  { label: "OBC", value: "OBC" },
  { label: "SC", value: "SC" },
  { label: "ST", value: "ST" },
  { label: "EWS(OPEN)", value: "EWS(OPEN)" },
  { label: "OPEN(TF)", value: "OPEN(TF)" },
  { label: "OPEN(GIRL)", value: "OPEN(GIRL)" },
  { label: "SC(Girl)", value: "SC(Girl)" },
  { label: "OBC(Girl)", value: "OBC(Girl)" },
  { label: "ST(Girl)", value: "ST(Girl)" },
  { label: "EWS(GL)", value: "EWS(GL)" },
  { label: "SC(AF)", value: "SC(AF)" },
  { label: "OBC(AF)", value: "OBC(AF)" },
  { label: "OPEN(AF)", value: "OPEN(AF)" },
  { label: "EWS(AF)", value: "EWS(AF)" },
  { label: "OPEN(FF)", value: "OPEN(FF)" },
  { label: "OBC(FF)", value: "OBC(FF)" },
  { label: "SC(FF)", value: "SC(FF)" },
  { label: "EWS(FF)", value: "EWS(FF)" },
  { label: "OPEN(PH)", value: "OPEN(PH)" },
  { label: "OBC(PH)", value: "OBC(PH)" },
  { label: "SC(PH)", value: "SC(PH)" },
  { label: "EWS(PH)", value: "EWS(PH)" },
  { label: "OOBC", value: "OOBC" },
  { label: "OOBC(Girl)", value: "OOBC(Girl)" },
  // 'Neutral' and 'Female' are handled by the gender filter, not category
];

const aktuQuotaOptions = [
  { label: "Home State", value: "Home State" },
  { label: "All India", value: "All India" },
];

const aktuRoundOptions = [
  { label: "Round 1", value: "1" },
  { label: "Round 2", value: "2" },
  { label: "Round 3", value: "3" },
  { label: "Round 4", value: "4" },
];
  
  return (
    <div className="container py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AKTU Search Results</h1>
        <p className="text-muted-foreground">
          Showing colleges for rank {rank} and below (AKTU)
        </p>
      </div>
      
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar filters */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <div className="mb-6">
              <BoardToggle value={board} onChange={handleBoardChange} />
            </div>
            
            <FilterPanel
              gender={gender}
              category={category}
              quota={quota}
              round={round} // Added round
              onFilterChange={handleFilterChange}
              categoryOptions={aktuCategoryOptions}
              quotaOptions={aktuQuotaOptions}
              roundOptions={aktuRoundOptions} // Pass AKTU specific rounds
            />
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="glass rounded-lg p-8 text-center">
              <p className="text-red-400">{error}</p>
              <button
                className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-primary to-purple-light text-white"
                onClick={fetchResults}
              >
                Try Again
              </button>
            </div>
          ) : currentPageResults.length === 0 ? (
            <div className="glass rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No Colleges Found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search with a different rank.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Found {currentResults.length} colleges
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPageResults.map((result, index) => {
                  const aktuResult = result as AktuEntry; // Explicitly AKTU
                  return (
                    <CollegeCard
                      key={`${aktuResult.id}-${index}`}
                      institute={aktuResult.institute}
                      program={aktuResult.program}
                      openingRank={aktuResult.opening_rank}
                      closingRank={aktuResult.closing_rank}
                      category={aktuResult.category}
                      gender={aktuResult.seat_gender} // Use seat_gender for AKTU
                      stream={aktuResult.stream}
                      quota={aktuResult.quota}
                      round={aktuResult.round}
                      city={aktuResult.city} // Added city
                    />
                  );
                })}
              </div>
              
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
