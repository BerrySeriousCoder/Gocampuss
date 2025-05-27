
import { Link } from "react-router-dom";
import logo from '../../assets/logobg.png'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center  gap-2">
          <Link to="/" className="flex items-center  gap-2">
            <img src={logo} alt="logo" className="h-10 w-8" />

            <span className="text-xl font-bold tracking-tight">Go campuss</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/70 transition-colors hover:text-foreground">
            Search by Rank
          </Link>
          <Link to="/college-search" className="text-foreground/70 transition-colors hover:text-foreground">
            Search by College
          </Link>
          <Link to="/colleges" className="text-foreground/70 transition-colors hover:text-foreground">
            All Colleges
          </Link>
        </nav>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-light to-purple-accent hover:from-purple-light hover:to-purple-accent/90 text-white h-10 px-4 py-2"
          >
            Portfolio
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
