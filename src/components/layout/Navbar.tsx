
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../../assets/logobg.png';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

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
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-light to-purple-accent hover:from-purple-light hover:to-purple-accent/90 text-white h-10 px-4 py-2"
          >
            Portfolio
          </Link>
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link to="/" className="flex items-center gap-2" onClick={closeSheet}>
              <img src={logo} alt="logo" className="h-10 w-8" />
              <span className="text-xl font-bold tracking-tight">Go campuss</span>
            </Link>
            <div className="my-4 h-[1px] w-full bg-muted" />
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-foreground/70 transition-colors hover:text-foreground" onClick={closeSheet}>
                Search by Rank
              </Link>
              <Link to="/college-search" className="text-foreground/70 transition-colors hover:text-foreground" onClick={closeSheet}>
                Search by College
              </Link>
              <Link to="/colleges" className="text-foreground/70 transition-colors hover:text-foreground" onClick={closeSheet}>
                All Colleges
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-light to-purple-accent hover:from-purple-light hover:to-purple-accent/90 text-white h-10 px-4 py-2"
                onClick={closeSheet}
              >
                Portfolio
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
