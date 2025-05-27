import { useState, useEffect, useMemo } from "react";
import AllCollegeCard from "@/components/ui/AllCollegeCard";
import Loader from "@/components/ui/Loader";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input"; // Import Input component

import { College } from "@/lib/types";

const CollegeList = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || "";
        const response = await fetch(`${backendBaseUrl}/api/college-info`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: College[] = await response.json();
        console.log("Colleges fetched:", data); // Add this line
        setColleges(data);
      } catch (err: any) {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const filteredColleges = useMemo(() => {
    if (!searchTerm) {
      return colleges;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return colleges.filter(
      (college) =>
        college.collegeName.toLowerCase().includes(lowerCaseSearchTerm) ||
        college.location.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [colleges, searchTerm]);

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
            onClick={() => window.location.reload()} // Simple reload for now
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-center">All Colleges</h1>
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search colleges by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto glass text-white placeholder-gray-400"
        />
      </div>
      {filteredColleges.length === 0 ? (
        <div className="glass rounded-lg p-8 text-center">
          <p className="text-muted-foreground text-lg">
            😔 Sorry, we couldn't find any colleges matching "{searchTerm}". Maybe we'll add them soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <Link
              key={college._id}
              to={`/college/${college._id}`}
              state={{ college }} // Pass the entire college object as state
            >
              <AllCollegeCard college={college} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollegeList;