import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BoardToggle from "../components/ui/BoardToggle";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JoinGroupDialog from "@/components/ui/JoinGroupDialog";


const Home = () => {
  const navigate = useNavigate();
  const [rank, setRank] = useState<string>("");
  const [board, setBoard] = useState<"aktu">("aktu");
  const [category, setCategory] = useState<string>("OPEN"); // Set default category to "OPEN"
  const [gender, setGender] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate rank
    if (!rank || isNaN(Number(rank)) || Number(rank) <= 0) {
      setSearchError("Please enter a valid rank");
      return;
    }

    // Clear errors
    setSearchError("");

    // Build query parameters
    const params = new URLSearchParams();
    params.append("rank", rank);
    params.append("board", board);
    
    if (category) {
      params.append("category", category);
    }
    
    if (gender) {
      params.append("gender", gender);
    }

    // Navigate to search results
    navigate(`/search-results?${params.toString()}`);
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-background z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-dark to-purple-primary opacity-90"></div>
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-light/20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-accent/10 blur-3xl"></div>
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 px-4 py-20 md:py-32 mx-auto max-w-7xl">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideUpVariants} className="space-y-6 text-left">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">Find Your Perfect College</span> Match By Rank
              </h1>
              
              <p className="text-xl text-gray-200 max-w-xl">
                Discover the best colleges and programs you qualify for based on your entrance exam rank, category, and preferences.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  onClick={() => document.getElementById('search-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-purple-light to-purple-accent hover:from-purple-light hover:to-purple-accent/90 text-white"
                  size="lg"
                >
                  Find Colleges <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/college-search")} 
                  className="border-white/20 text-white hover:bg-white/10"
                  size="lg"
                >
                  Search By College Name
                </Button>
              </div>
            </motion.div>
            
            <motion.div variants={slideUpVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-primary/20 to-purple-light/20 rounded-xl blur-md -m-2"></div>
              <div id="search-form" className="bg-background/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg relative">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="rank"
                      className="text-white text-lg font-medium"
                    >
                      Your Rank
                    </Label>
                    <Input 
                      id="rank"
                      type="number"
                      placeholder="Enter your rank"
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-purple-light"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                    />
                    {searchError && (
                      <p className="text-xs text-red-400 mt-1">{searchError}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white text-lg font-medium">
                      Entrance Exam Board
                    </Label>
                    <BoardToggle value={board} onChange={setBoard} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white text-lg font-medium">
                      Category (Optional)
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={`pill ${category === "OPEN" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
                        onClick={() => setCategory("OPEN")}
                      >
                        OPEN
                      </button>
                      <button
                        type="button"
                        className={`pill ${category === "obc" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
                        onClick={() => setCategory("obc")}
                      >
                        OBC
                      </button>
                      <button
                        type="button"
                        className={`pill ${category === "sc" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
                        onClick={() => setCategory("sc")}
                      >
                        SC
                      </button>
                      <button
                        type="button"
                        className={`pill ${category === "st" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
                        onClick={() => setCategory("st")}
                      >
                        ST
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white text-lg font-medium">
                      Gender (Optional)
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={`pill ${gender === "" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
                        onClick={() => setGender("")}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        className={`pill ${gender === "male" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
                        onClick={() => setGender("male")}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        className={`pill ${gender === "female" ? "bg-gradient-to-r from-purple-primary to-purple-light text-white" : ""}`}
                        onClick={() => setGender("female")}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-purple-primary to-purple-light text-white font-medium hover:from-purple-light hover:to-purple-accent transition-all"
                  >
                    Find Eligible Colleges <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      





      {/* How It Works Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
        className="py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={slideUpVariants} className="glass rounded-lg p-8 flex flex-col items-center text-center card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">1. Enter Your Rank</h3>
              <p className="text-muted-foreground">Provide your JEE Main rank and other details to get started.</p>
            </motion.div>
            <motion.div variants={slideUpVariants} className="glass rounded-lg p-8 flex flex-col items-center text-center card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.47L19.53 8.73L12 13L4.47 8.73L12 4.47ZM4 16.5V9.5L12 14L20 9.5V16.5L12 21L4 16.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">2. Get Personalized Matches</h3>
              <p className="text-muted-foreground">Our system analyzes your data to suggest the best colleges and branches.</p>
            </motion.div>
            <motion.div variants={slideUpVariants} className="glass rounded-lg p-8 flex flex-col items-center text-center card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">3. Secure Your Admission</h3>
              <p className="text-muted-foreground">Receive step-by-step guidance through the counseling and admission process.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

            {/* About Us Section */}
            <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
        className="py-20 bg-purple-primary/20 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Your Trusted Partner in AKTU Admissions
          </h2>
          <p className="text-lg italic mb-8 text-muted-foreground max-w-3xl mx-auto">
            At AKTU Counseling Hub, we understand the challenges of college admissions. Our dedicated team of experts provides unparalleled guidance to help you navigate the complex AKTU counseling process with ease and confidence.
          </p>
          <p className="text-lg italic text-muted-foreground max-w-3xl mx-auto">
            From personalized rank analysis to strategic college selection and hassle-free documentation, we are committed to ensuring you secure your dream seat in an AKTU affiliated college. Your success is our priority.
          </p>
          <div className="mt-10">
            <Button
              onClick={() => navigate("/portfolio")}
              className="bg-purple-light text-purple-dark px-8 py-4 rounded-full text-lg font-bold hover:bg-white transition-colors duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-light focus:ring-opacity-50"
            >
              Learn More About Our Expert
            </Button>
          </div>
        </div>
        {/* Abstract shapes for background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute w-64 h-64 bg-purple-light/10 rounded-full -top-20 -right-20 animate-blob animation-delay-1000"></div>
          <div className="absolute w-80 h-80 bg-purple-accent/10 rounded-full -bottom-40 -left-40 animate-blob animation-delay-3000"></div>
        </div>
      </motion.section>

      

      {/* FAQ Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
        className="py-20 bg-purple-primary/20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Your Questions, Answered
          </h2>
          <div className="max-w-4xl mx-auto text-left">
            <Accordion type="single" collapsible className="w-full">
              <motion.div variants={slideUpVariants}>
                <AccordionItem value="item-1" className="glass rounded-lg mb-4 card-hover">
                  <AccordionTrigger className="text-white text-xl font-semibold p-6 hover:no-underline">What exactly is AKTU counseling and why is it crucial?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground p-6 pt-0">
                    AKTU counseling is the centralized seat allocation process for all colleges affiliated with Dr. A.P.J. Abdul Kalam Technical University. It's crucial because a single mistake in choice filling or document submission can cost you a year or a better college. Our guidance ensures you navigate this complex process flawlessly.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              <motion.div variants={slideUpVariants}>
                <AccordionItem value="item-2" className="glass rounded-lg mb-4 card-hover">
                  <AccordionTrigger className="text-white text-xl font-semibold p-6 hover:no-underline">How do you ensure I get into the "best" college for my rank?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground p-6 pt-0">
                    We don't just provide a list; we craft a personalized roadmap. By analyzing your JEE Main rank, preferred branches, budget, and future aspirations, we identify colleges with the best faculty, placements, and infrastructure that align perfectly with your profile. We leverage insider data and past trends to maximize your chances.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              <motion.div variants={slideUpVariants}>
                <AccordionItem value="item-3" className="glass rounded-lg mb-4 card-hover">
                  <AccordionTrigger className="text-white text-xl font-semibold p-6 hover:no-underline">What if I have a low JEE Main rank? Is counseling still beneficial?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground p-6 pt-0">
                    Absolutely! Many students with lower ranks miss out on good opportunities due to lack of information. Our expertise lies in finding hidden gems and optimizing your choices to secure the best possible seat, even with a challenging rank. Strategic counseling can make a significant difference.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              <motion.div variants={slideUpVariants}>
                <AccordionItem value="item-4" className="glass rounded-lg mb-4 card-hover">
                  <AccordionTrigger className="text-white text-xl font-semibold p-6 hover:no-underline">Beyond admissions, what other support do you offer?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground p-6 pt-0">
                    Our support extends beyond just securing admission. We provide comprehensive assistance with hostel and PG accommodation, guidance on scholarships and educational loans, and even post-admission support to ensure a smooth transition into your new academic life. We're with you every step of the way.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            </Accordion>
          </div>
        </div>
      </motion.section>

            {/* CTA Section */}
            <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants}
        className="py-20 bg-gradient-to-r from-purple-primary/60 to-purple-light/60 relative overflow-hidden text-white"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Secure Your Future?
          </h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Get personalized counseling or join our community group for support and insights.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              onClick={() => {
                // Placeholder for counselling action - maybe scroll to a contact form or open a modal?
                // For now, let's just log it or navigate to a contact page if one exists
                console.log("Request Counselling");
                // navigate('/contact'); // Example if you have a contact page
              }}
              className="bg-white text-purple-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-200 transition-colors duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              Get Counselling
            </Button>
            <JoinGroupDialog>
              <Button
                className="bg-transparent border border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-colors duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                Join Our Group
              </Button>
            </JoinGroupDialog>
          </div>
        </div>
        {/* Abstract shapes for background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30">
          <div className="absolute w-64 h-64 bg-white rounded-full -top-20 -right-20 animate-blob animation-delay-1000"></div>
          <div className="absolute w-80 h-80 bg-white rounded-full -bottom-40 -left-40 animate-blob animation-delay-3000"></div>
        </div>
      </motion.section>

      

    </motion.div>
  );
};

export default Home;
