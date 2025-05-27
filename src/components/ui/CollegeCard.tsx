import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface CollegeCardProps {
  _id: string; // Added _id
  institute: string;
  program: string;
  openingRank: number;
  closingRank: number;
  category?: string;
  gender?: string;
  seatType?: string;
  round?: string | number;
  stream?: string;
  quota?: string;
  city?: string; // Added city
}

const CollegeCard = ({
  _id, // Destructure _id
  institute,
  program,
  openingRank,
  closingRank,
  category = "General",
  gender = "Gender-Neutral",
  seatType = "OPEN",
  round,
  stream,
  quota,
  city, // Added city
}: CollegeCardProps) => {
  // Create a URL-friendly version of the institute name for linking
  const instituteSlug = institute.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  return (
    <div className="glass rounded-lg p-5 card-hover animate-fade-in">
      <div className="flex flex-col h-full">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{institute}</h3>
        {city && <p className="text-sm text-muted-foreground mb-1">{city}</p>}
        
        <div className="text-muted-foreground mb-3 line-clamp-2">
          {program} {stream && `(${stream})`}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="pill bg-purple-dark/50">{category}</span>
          <span className="pill bg-purple-dark/50">{gender}</span>
          {seatType && <span className="pill bg-purple-dark/50">{seatType}</span>}
          {quota && <span className="pill bg-purple-dark/50">{quota}</span>}
          {round && <span className="pill bg-purple-primary/50">Round {round}</span>}
        </div>
        
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-muted-foreground text-xs">Opening Rank</p>
              <p className="text-xl font-bold">{openingRank.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-xs">Closing Rank</p>
              <p className="text-xl font-bold">{closingRank.toLocaleString()}</p>
            </div>
          </div>
          
          {/* Wrap the "View Details" div with a Link component */}
          <Link
            to="/colleges" // Hardcoded to /colleges route
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-primary to-purple-light px-4 py-2 font-medium text-white transition hover:from-purple-light hover:to-purple-accent"
          >
            View colleges Details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
