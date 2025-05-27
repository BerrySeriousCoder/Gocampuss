
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import BoardToggle from "../components/ui/BoardToggle";
import CollegeCard from "../components/ui/CollegeCard";
import FilterPanel from "../components/ui/FilterPanel"; // Import FilterPanel
import Loader from "../components/ui/Loader";
import { fetchPaginatedAktuColleges, searchColleges } from "../lib/supabase";
import { JosaaEntry, AktuEntry } from "../lib/types";
import { CollegeCardProps } from "../components/ui/CollegeCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10; // Define items per page constant

const CollegeSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [board, setBoard] = useState<"aktu">("aktu");
  const [loading, setLoading] = useState<boolean>(false);
  const [colleges, setColleges] = useState<(JosaaEntry | AktuEntry)[]>([]); // Renamed from searchResults
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searched, setSearched] = useState<boolean>(false);

  // Filter states
  const [gender, setGender] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [quota, setQuota] = useState<string | null>(null);
  const [round, setRound] = useState<number | null>(null);

  // Effect for initial load and pagination, and when filters change
  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchAllColleges(currentPage, { gender, category, quota, round });
    }
  }, [currentPage, board, gender, category, quota, round]); // Add filters to dependencies

  // Effect for real-time search with debounce
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        handleSearch(1, { gender, category, quota, round }); // Pass filters to search
      } else {
        fetchAllColleges(currentPage, { gender, category, quota, round }); // Pass filters to fetch all
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery, gender, category, quota, round]); // Add filters to dependencies

  const fetchAllColleges = async (page: number, filters: any = {}) => {
    setLoading(true);
    try {
      const { data, count } = await fetchPaginatedAktuColleges(page, ITEMS_PER_PAGE, filters);
      setColleges(data);
      setTotalItems(count);
      setSearched(false);
    } catch (error) {
      console.error("Error fetching all colleges:", error);
      setColleges([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (page: number, filters: any = {}) => {
    setLoading(true);
    try {
      const { data, count } = await searchColleges(searchQuery, "aktu", page, ITEMS_PER_PAGE, filters);
      setColleges(data);
      setTotalItems(count);
      setCurrentPage(page);
      setSearched(true);
    } catch (error) {
      console.error("Error searching colleges:", error);
      setColleges([]);
      setTotalItems(0);
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
      case "quota":
        setQuota(value);
        break;
      case "round":
        setRound(value ? Number(value) : null);
        break;
      default:
        break;
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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
    <div className="animate-fade-in">
      <div className="gradient-bg py-16 px-4 md:py-24 text-center">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Search Colleges by Name</h1>
          <p className="text-xl text-gray-200 mb-10">
            Find detailed information about specific colleges and institutions.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-full p-2 flex items-center">
              <div className="pl-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Enter college name..."
                className="flex-1 bg-transparent px-4 py-2 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="mt-6 flex justify-center">
              <BoardToggle
                value={board}
                onChange={(value) => setBoard(value)} // onChange will only ever pass 'aktu'
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-12 flex flex-col lg:flex-row gap-8">
        {/* Filter Panel */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <FilterPanel
              gender={gender}
              category={category}
              quota={quota}
              round={round}
              onFilterChange={handleFilterChange}
              categoryOptions={aktuCategoryOptions}
              quotaOptions={aktuQuotaOptions}
              roundOptions={aktuRoundOptions}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : colleges.length === 0 ? (
            <div className="glass rounded-lg p-8 text-center max-w-xl mx-auto">
              <h3 className="text-xl font-semibold mb-2">No Colleges Found</h3>
              <p className="text-muted-foreground">
                {searched ? "Try searching with a different name or adjusting filters." : "No colleges available with the current filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">
                {searched ? `Search Results for "${searchQuery}"` : "All Colleges"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((result, index) => {
                  const aktuResult = result as AktuEntry;

                  return (
                    <CollegeCard
                      key={`${aktuResult.id}-${index}`}
                      institute={aktuResult.institute}
                      program={aktuResult.program}
                      openingRank={aktuResult.opening_rank}
                      closingRank={aktuResult.closing_rank}
                      category={aktuResult.category}
                      gender={aktuResult.seat_gender}
                      stream={aktuResult.stream}
                      quota={aktuResult.quota}
                      round={aktuResult.round}
                      city={aktuResult.city}
                    />
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                    {/* Render first page link */}
                    {totalPages > 0 && (
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* Render ellipsis if current page is far from the beginning */}
                    {currentPage > 3 && totalPages > 5 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Render pages around the current page */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      )
                      .map((page) => {
                        if (page === 1 || page === totalPages) return null;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={page === currentPage}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                    {/* Render ellipsis if current page is far from the end */}
                    {currentPage < totalPages - 2 && totalPages > 5 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {/* Render last page link if not the first page and total pages > 1 */}
                    {totalPages > 1 && (
                      <PaginationItem>
                        <PaginationLink onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeSearch;
