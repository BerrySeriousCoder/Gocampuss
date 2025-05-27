import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building, Map, Briefcase, Users, BookOpen, GraduationCap, DollarSign, Award, Video, Image as ImageIcon } from "lucide-react";
import Loader from "../components/ui/Loader";
import { fetchCollegeDetails } from "../lib/supabase";
import { JosaaEntry, AktuEntry } from "../lib/types";
import { College } from "../lib/types";

const CollegeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [josaaData, setJosaaData] = useState<JosaaEntry[] | null>(null);
  const [aktuData, setAktuData] = useState<AktuEntry[] | null>(null);
  const [collegeInfo, setCollegeInfo] = useState<College | null>(null);
  
  const loadCollegeData = async () => {
    setLoading(true);
    setError(null);

    // 1. Try to get college data from location state (passed from CollegeList)
    if (location.state && location.state.college) {
      setCollegeInfo(location.state.college as College);
      setLoading(false);
      return; // Exit early if data is found in state
    }

    // 2. If not in state, fetch from backend API using the ID from params
    if (!id) {
      setLoading(false);
      setError("College ID not provided in URL.");
      return;
    }
    
    try {
      const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "";
      const response = await fetch(`${backendBaseUrl}/api/college-info/${id}`);
      
      if (response.ok) {
        const collegeData: College = await response.json();
        setCollegeInfo(collegeData);
      } else {
        // If backend API fails, try fetching from Supabase (for existing data)
        // Note: Supabase fetchCollegeDetails expects a college name/slug, not an _id.
        // This fallback is for cases where the ID might still be a slug from old links.
        const decodedName = id.replace(/-/g, " ");
        const results = await fetchCollegeDetails(decodedName, "both");
        setJosaaData(results.josaa);
        setAktuData(results.aktu);

        let actualName = "";
        if (results.josaa && results.josaa.length > 0) {
          actualName = results.josaa[0].institute;
        } else if (results.aktu && results.aktu.length > 0) {
          actualName = results.aktu[0].institute;
        }

        if (actualName) {
          setCollegeInfo({
            _id: id, // Use the ID from params
            collegeName: actualName,
            location: "Campus Location, City, State", // Placeholder
            counsellingNames: "",
            established: "",
            campus: "",
            nirfRanking: "",
            seatMatrix: [],
            totalCSStudents: "",
            nbaBranches: "",
            cutoffs: {},
            hostelFees: { boys: "", girls: "" },
            academicFees: { year1: "", year2: "", year3: "", year4: "", total: "" },
            totalFees: "",
            placements: {
              totalStudents: "",
              totalCompanies: "",
              totalOffers: "",
              highestPackage: "",
              avgPackage: "",
              csAvgPackage: "",
              companyData: [],
            },
          });
        } else {
          setError("College not found with provided ID or name.");
        }
      }
    } catch (err) {
      console.error("Error fetching college details:", err);
      setError("Failed to load college data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollegeData();
  }, [id, location.state]);

  // Group JOSAA data by program for better display
  const groupedJosaaData = josaaData
    ? josaaData.reduce<Record<string, JosaaEntry[]>>((acc, entry) => {
        if (!acc[entry.academic_program_name]) {
          acc[entry.academic_program_name] = [];
        }
        acc[entry.academic_program_name].push(entry);
        return acc;
      }, {})
    : {};

  // Group AKTU data by program and stream
  const groupedAktuData = aktuData
    ? aktuData.reduce<Record<string, AktuEntry[]>>((acc, entry) => {
        const key = `${entry.program} - ${entry.stream}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(entry);
        return acc;
      }, {})
    : {};
  
  if (loading) {
    return <Loader />;
  }
  
  if (error) {
    return (
      <div className="container py-12">
        <div className="glass rounded-lg p-8 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-primary to-purple-light text-white"
            onClick={loadCollegeData}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!collegeInfo && !josaaData && !aktuData) {
    return (
      <div className="container py-12">
        <div className="glass rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">College Not Found</h2>
          <p className="text-muted-foreground">
            We couldn't find any information about this college.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${collegeInfo?.profilePic || 'https://via.placeholder.com/1500x500?text=College+Image'})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{collegeInfo?.collegeName}</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-4 flex items-center justify-center gap-2">
              <Map className="h-6 w-6" /> {collegeInfo?.location}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {collegeInfo?.nirfRanking && <span className="pill bg-purple-primary/50">NIRF Rank: {collegeInfo.nirfRanking}</span>}
              {collegeInfo?.established && <span className="pill bg-purple-primary/50">Est. {collegeInfo.established}</span>}
              {collegeInfo?.campus && <span className="pill bg-purple-primary/50">Campus: {collegeInfo.campus}</span>}
              {collegeInfo?.counsellingNames && <span className="pill bg-purple-primary/50">Counselling: {collegeInfo.counsellingNames}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Image and Video Gallery */}
        {(collegeInfo?.collegeTourImages?.length > 0 || collegeInfo?.boysHostelImages?.length > 0 || collegeInfo?.girlsHostelImages?.length > 0 || collegeInfo?.collegeTourVideo || collegeInfo?.studentReviewVideo) && (
          <div className="glass rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><ImageIcon className="h-6 w-6" /> Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {collegeInfo?.collegeTourImages?.map((img, index) => (
                <img key={`ct-${index}`} src={img} alt="College Tour" className="w-full h-48 object-cover rounded-lg" />
              ))}
              {collegeInfo?.boysHostelImages?.map((img, index) => (
                <img key={`bh-${index}`} src={img} alt="Boys Hostel" className="w-full h-48 object-cover rounded-lg" />
              ))}
              {collegeInfo?.girlsHostelImages?.map((img, index) => (
                <img key={`gh-${index}`} src={img} alt="Girls Hostel" className="w-full h-48 object-cover rounded-lg" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collegeInfo?.collegeTourVideo && (
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src={collegeInfo.collegeTourVideo.replace("watch?v=", "embed/")}
                    title="College Tour Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
              {collegeInfo?.studentReviewVideo && (
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src={collegeInfo.studentReviewVideo.replace("watch?v=", "embed/")}
                    title="Student Review Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start mb-8 overflow-x-auto">
            <TabsTrigger value="overview" className="flex gap-2 items-center">
              <Building className="h-4 w-4" /> Overview
            </TabsTrigger>
            {josaaData && josaaData.length > 0 && (
              <TabsTrigger value="josaa-cutoffs" className="flex gap-2 items-center">
                <BookOpen className="h-4 w-4" /> JOSAA Cutoffs
              </TabsTrigger>
            )}
            {aktuData && aktuData.length > 0 && (
              <TabsTrigger value="aktu-cutoffs" className="flex gap-2 items-center">
                <BookOpen className="h-4 w-4" /> AKTU Cutoffs
              </TabsTrigger>
            )}
            <TabsTrigger value="fees" className="flex gap-2 items-center">
              <DollarSign className="h-4 w-4" /> Fees
            </TabsTrigger>
            <TabsTrigger value="placement" className="flex gap-2 items-center">
              <Award className="h-4 w-4" /> Placements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="glass rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">About {collegeInfo?.collegeName}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Key Information</h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Established:</strong> {collegeInfo?.established}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Campus Size:</strong> {collegeInfo?.campus}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>NIRF Ranking:</strong> {collegeInfo?.nirfRanking}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    <strong>Counselling Names:</strong> {collegeInfo?.counsellingNames}
                  </p>
                  {collegeInfo?.totalCSStudents && (
                    <p className="text-muted-foreground mb-2">
                      <strong>Total CS Students:</strong> {collegeInfo.totalCSStudents}
                    </p>
                  )}
                  {collegeInfo?.nbaBranches && (
                    <p className="text-muted-foreground mb-2">
                      <strong>NBA Accredited Branches:</strong> {collegeInfo.nbaBranches}
                    </p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><BookOpen className="h-5 w-5" /> Programs Offered (Seat Matrix)</h3>
                  {collegeInfo?.seatMatrix && collegeInfo.seatMatrix.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[400px] table-auto">
                        <thead>
                          <tr className="border-b border-surface-border">
                            <th className="py-2 px-4 text-left">Branch</th>
                            <th className="py-2 px-4 text-right">Seats</th>
                          </tr>
                        </thead>
                        <tbody>
                          {collegeInfo.seatMatrix.map((branch, index) => (
                            <tr key={index} className="border-b border-surface-border hover:bg-surface/50">
                              <td className="py-3 px-4">{branch.branch}</td>
                              <td className="py-3 px-4 text-right">{branch.seats}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No specific seat matrix data available.</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {josaaData && josaaData.length > 0 && (
            <TabsContent value="josaa-cutoffs">
              <div className="glass rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">JOSAA Cutoffs</h2>
                
                {Object.entries(groupedJosaaData).map(([programName, entries]) => (
                  <div key={programName} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">{programName}</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px] table-auto">
                        <thead>
                          <tr className="border-b border-surface-border">
                            <th className="py-2 px-4 text-left">Seat Type</th>
                            <th className="py-2 px-4 text-left">Gender</th>
                            <th className="py-2 px-4 text-right">Opening Rank</th>
                            <th className="py-2 px-4 text-right">Closing Rank</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((entry, index) => (
                            <tr 
                              key={index} 
                              className="border-b border-surface-border hover:bg-surface/50"
                            >
                              <td className="py-3 px-4">{entry.seat_type}</td>
                              <td className="py-3 px-4">{entry.gender}</td>
                              <td className="py-3 px-4 text-right">{entry.opening_rank.toLocaleString()}</td>
                              <td className="py-3 px-4 text-right">{entry.closing_rank.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
          
          {aktuData && aktuData.length > 0 && (
            <TabsContent value="aktu-cutoffs">
              <div className="glass rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">AKTU Cutoffs</h2>
                
                {Object.entries(groupedAktuData).map(([programKey, entries]) => (
                  <div key={programKey} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">{programKey}</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[700px] table-auto">
                        <thead>
                          <tr className="border-b border-surface-border">
                            <th className="py-2 px-3 text-left">Round</th>
                            <th className="py-2 px-3 text-left">Quota</th>
                            <th className="py-2 px-3 text-left">Category</th>
                            <th className="py-2 px-3 text-left">Gender</th>
                            <th className="py-2 px-3 text-right">Opening Rank</th>
                            <th className="py-2 px-3 text-right">Closing Rank</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((entry, index) => (
                            <tr 
                              key={index} 
                              className="border-b border-surface-border hover:bg-surface/50"
                            >
                              <td className="py-3 px-3">{entry.round}</td>
                              <td className="py-3 px-3">{entry.quota}</td>
                              <td className="py-3 px-3">{entry.category}</td>
                              <td className="py-3 px-3">{entry.gender}</td>
                              <td className="py-3 px-3 text-right">{entry.opening_rank.toLocaleString()}</td>
                              <td className="py-3 px-3 text-right">{entry.closing_rank.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="fees">
            <div className="glass rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><DollarSign className="h-6 w-6" /> Fee Structure</h2>
              <p className="text-muted-foreground mb-6">
                This is an approximate fee structure and may vary. Please check the official website for the most up-to-date information.
              </p>
              
              {collegeInfo?.academicFees || collegeInfo?.hostelFees || collegeInfo?.totalFees ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] table-auto">
                    <thead>
                      <tr className="border-b border-surface-border">
                        <th className="py-2 px-4 text-left">Fee Type</th>
                        <th className="py-2 px-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collegeInfo?.academicFees && (
                        <>
                          <tr className="border-b border-surface-border hover:bg-surface/50">
                            <td className="py-3 px-4 font-semibold" colSpan={2}>Academic Fees</td>
                          </tr>
                          <tr className="border-b border-surface-border hover:bg-surface/50">
                            <td className="py-3 px-4">Year 1</td>
                            <td className="py-3 px-4 text-right">₹ {collegeInfo.academicFees.year1}</td>
                          </tr>
                          <tr className="border-b border-surface-border hover:bg-surface/50">
                            <td className="py-3 px-4">Year 2</td>
                            <td className="py-3 px-4 text-right">₹ {collegeInfo.academicFees.year2}</td>
                          </tr>
                          <tr className="border-b border-surface-border hover:bg-surface/50">
                            <td className="py-3 px-4">Year 3</td>
                            <td className="py-3 px-4 text-right">₹ {collegeInfo.academicFees.year3}</td>
                          </tr>
                          <tr className="border-b border-surface-border hover:bg-surface/50">
                            <td className="py-3 px-4">Year 4</td>
                            <td className="py-3 px-4 text-right">₹ {collegeInfo.academicFees.year4}</td>
                          </tr>
                          <tr className="border-b border-surface-border hover:bg-surface/50 font-bold">
                            <td className="py-3 px-4">Total Academic Fees</td>
                            <td className="py-3 px-4 text-right">₹ {collegeInfo.academicFees.total}</td>
                          </tr>
                        </>
                      )}
                      {collegeInfo?.hostelFees && (
                        <>
                          <tr className="border-b border-surface-border hover:bg-surface/50">
                            <td className="py-3 px-4 font-semibold" colSpan={2}>Hostel Fees</td>
                          </tr>
                          <tr className="border-b border-surface-border hover:bg-surface/50">
                            <td className="py-3 px-4">Boys Hostel (4 years)</td>
                            <td className="py-3 px-4 text-right">₹ {collegeInfo.hostelFees.boys}</td>
                          </tr>
                          <tr className="border-b border-surface-border hover:bg-surface/50">
                            <td className="py-3 px-4">Girls Hostel (4 years)</td>
                            <td className="py-3 px-4 text-right">₹ {collegeInfo.hostelFees.girls}</td>
                          </tr>
                        </>
                      )}
                      {collegeInfo?.totalFees && (
                        <tr className="border-b border-surface-border hover:bg-surface/50 font-bold text-lg">
                          <td className="py-3 px-4">Total Estimated Fees</td>
                          <td className="py-3 px-4 text-right">₹ {collegeInfo.totalFees}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground">No fee data available for this college.</p>
              )}
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Additional Fee Information</h3>
                <p className="text-muted-foreground">
                  Please note that the fees provided are estimates and may vary. For the most accurate and up-to-date fee structure,
                  including payment methods and other charges, please refer to the official college website or prospectus.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="placement">
            <div className="glass rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Users className="h-6 w-6" /> Placement Statistics</h2>
              <p className="text-muted-foreground mb-6">
                Note: The following placement data is indicative and may vary. Please check the official placement brochure for accurate information.
              </p>
              
              {collegeInfo?.placements ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {collegeInfo.placements.totalStudents && (
                      <div className="bg-surface p-6 rounded-lg text-center">
                        <h3 className="text-5xl font-bold gradient-text mb-2">{collegeInfo.placements.totalStudents}</h3>
                        <p className="text-muted-foreground">Total Students Placed</p>
                      </div>
                    )}
                    {collegeInfo.placements.totalCompanies && (
                      <div className="bg-surface p-6 rounded-lg text-center">
                        <h3 className="text-5xl font-bold gradient-text mb-2">{collegeInfo.placements.totalCompanies}</h3>
                        <p className="text-muted-foreground">Total Companies Visited</p>
                      </div>
                    )}
                    {collegeInfo.placements.totalOffers && (
                      <div className="bg-surface p-6 rounded-lg text-center">
                        <h3 className="text-5xl font-bold gradient-text mb-2">{collegeInfo.placements.totalOffers}</h3>
                        <p className="text-muted-foreground">Total Offers</p>
                      </div>
                    )}
                    {collegeInfo.placements.avgPackage && (
                      <div className="bg-surface p-6 rounded-lg text-center">
                        <h3 className="text-5xl font-bold gradient-text mb-2">₹{collegeInfo.placements.avgPackage}</h3>
                        <p className="text-muted-foreground">Average Package</p>
                      </div>
                    )}
                    {collegeInfo.placements.highestPackage && (
                      <div className="bg-surface p-6 rounded-lg text-center">
                        <h3 className="text-5xl font-bold gradient-text mb-2">₹{collegeInfo.placements.highestPackage}</h3>
                        <p className="text-muted-foreground">Highest Package</p>
                      </div>
                    )}
                    {collegeInfo.placements.csAvgPackage && (
                      <div className="bg-surface p-6 rounded-lg text-center">
                        <h3 className="text-5xl font-bold gradient-text mb-2">₹{collegeInfo.placements.csAvgPackage}</h3>
                        <p className="text-muted-foreground">CS Average Package</p>
                      </div>
                    )}
                  </div>
                  
                  {collegeInfo.placements.companyData && collegeInfo.placements.companyData.length > 0 && (
                    <>
                      <h3 className="text-xl font-semibold mb-4">Recruiting Companies</h3>
                      <div className="overflow-x-auto mb-8">
                        <table className="w-full min-w-[600px] table-auto">
                          <thead>
                            <tr className="border-b border-surface-border">
                              <th className="py-2 px-4 text-left">Company Name</th>
                              <th className="py-2 px-4 text-right">Offers</th>
                              <th className="py-2 px-4 text-right">CTC</th>
                            </tr>
                          </thead>
                          <tbody>
                            {collegeInfo.placements.companyData.map((company, index) => (
                              <tr key={index} className="border-b border-surface-border hover:bg-surface/50">
                                <td className="py-3 px-4">{company.name}</td>
                                <td className="py-3 px-4 text-right">{company.offers}</td>
                                <td className="py-3 px-4 text-right">{company.ctc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">No placement data available for this college.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CollegeDetails;
