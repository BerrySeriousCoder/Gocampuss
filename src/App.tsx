
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import CollegeSearch from "./pages/CollegeSearch";
import CollegeDetails from "./pages/CollegeDetails";
import CollegeList from "./pages/CollegeList";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Lenis from 'lenis'
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  const location = useLocation(); // Get current location

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]); // Trigger effect when pathname changes


  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });


    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes> {/* Routes should be inside BrowserRouter */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/college-search" element={<CollegeSearch />} />
            <Route path="/colleges" element={<CollegeList />} />
            <Route path="/college/:id" element={<CollegeDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  )

};

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


export default WrappedApp;
