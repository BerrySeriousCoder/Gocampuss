
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-primary to-purple-light px-6 py-3 font-medium text-white transition hover:from-purple-light hover:to-purple-accent"
        >
          Back to Home <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
