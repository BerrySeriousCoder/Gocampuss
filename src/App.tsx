
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function  App()  {  
 

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
      <BrowserRouter>
        <Routes>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  )

};

export default App;
