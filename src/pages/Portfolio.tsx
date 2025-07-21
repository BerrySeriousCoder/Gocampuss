import { ArrowRight, Youtube } from 'lucide-react';
import { Instagram, X , Linkedin} from 'lucide-react';
import { testimonials } from "@/lib/testimonials";
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import JoinGroupDialog from "@/components/ui/JoinGroupDialog";
import profile from '../assets/profile.jpg'


const Portfolio = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  return (
    <div
      className="bg-purple-dark text-white min-h-screen glass"
    >
      {/* Header Section */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-purple-dark to-purple-primary/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-grow">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Sumit Mishra</h1>
              <h2 className="text-xl md:text-2xl mt-2 text-purple-light">AKTU COUNSELOR</h2>
              <p className="text-lg italic mt-4 text-muted-foreground">Helping students find the right college & secure their future!</p>
            </div>
            <img className='w-32 h-32 md:w-48 md:h-48 rounded-full flex-shrink-0 object-cover border-4 border-purple-light shadow-lg' src={profile}  alt="Profile" />
          </div>
        </div>
        {/* Abstract shapes for background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute w-64 h-64 bg-purple-light/10 rounded-full -top-20 -left-20"></div>
          <div className="absolute w-80 h-80 bg-purple-primary/10 rounded-full -bottom-40 -right-40"></div>
        </div>
      </section>

      {/* About Me Section */}
      <section
        className="py-20 bg-purple-primary/20"
      >
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <img src={profile} alt="About Me" className="w-full h-auto object-cover rounded-lg mt-4 shadow-lg" />
          </div>
          <div>
             <p className="text-lg italic mb-10">
              I'm Sumit Mishra, an AKTU Counseling Expert dedicated to guiding students toward their dream colleges.
            </p>
            <p className="text-lg italic">
              With years of experience in AKTU admissions, I have helped thousands of students navigate the complex counseling process, ensuring they make informed decisions based on their JEE Mains rank, preferences, and budget.
            </p>
            <p className="text-lg italic mt-10">
              My mission is to simplify the admission journey, providing clarity and confidence every step of the way. I believe in empowering students to make choices that align with their academic goals and career aspirations.
            </p>
            <div className='mt-10' >
            <a href="https://www.youtube.com/@sumitmishra77?feature=shared" target="_blank" rel="noopener noreferrer" className="text-purple-light hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                My Youtube Channel <Youtube size={40} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section
        className="py-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">WHY CHOOSE ME?</h2>
          {/* Diagram */}
          <div className="relative flex flex-col items-center justify-center py-12 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
            {/* Central Element */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-purple-primary flex items-center justify-center text-center text-lg font-semibold p-4 z-10 shadow-lg  md:mb-0">
              WHY CHOOSE ME?
            </div>

            {/* Surrounding Elements */}
            {/* On mobile, use flex column layout with visual connectors. On medium screens and up, use absolute positioning. */}
            <div className="flex flex-col items-center justify-center  md:absolute md:w-full md:h-full md:flex-row md:gap-0">
              {/* Top-Left */}
              <div className="flex flex-col items-center md:absolute md:top-[5%] md:left-[7%] z-10">
                <div className="w-2 h-11 bg-purple-light md:hidden"></div> {/* Mobile connector line */}
                <div className="w-48 h-48 md:w-48 md:h-48 rounded-full glass flex items-center justify-center text-center text-sm p-4 shadow-md card-hover">
                  <p className="font-semibold text-white">Insider Knowledge – Get exclusive insights into AKTU admissions, cutoffs & top colleges.</p>
                </div>
              </div>
              {/* Top-Right */}
              <div className="flex flex-col items-center md:absolute md:top-[5%] md:right-[7%] z-10">
                 <div className="w-2 h-11 bg-purple-light md:hidden"></div> {/* Mobile connector line */}
                <div className="w-48 h-48 md:w-48 md:h-48 rounded-full glass flex items-center justify-center text-center text-sm p-4 shadow-md card-hover">
                   <p className="font-semibold text-white">Expert Guidance – Years of experience in AKTU admissions & counseling.</p>
                </div>
              </div>
              {/* Middle-Left */}
              <div className="flex flex-col items-center md:absolute md:-left-[3%] md:top-1/2 md:-translate-y-1/2 z-10">
                 <div className="w-2 h-11 bg-purple-light md:hidden"></div> {/* Mobile connector line */}
                <div className="w-48 h-48 md:w-48 md:h-48 rounded-full glass flex items-center justify-center text-center text-sm p-4 shadow-md card-hover">
                  <p className="font-semibold text-white">Personalized Roadmap – Tailored counseling to match your aspirations, not generic advice.</p>
                </div>
              </div>
               {/* Middle-Right */}
              <div className="flex flex-col items-center md:absolute md:-right-[3%] md:top-1/2 md:-translate-y-1/2 z-10">
                 <div className="w-2 h-11 bg-purple-light md:hidden"></div> {/* Mobile connector line */}
                <div className="w-48 h-48 md:w-48 md:h-48 rounded-full glass flex items-center justify-center text-center text-sm p-4 shadow-md card-hover">
                  <p className="font-semibold text-white">Proven Track Record – Hundreds of students got into their dream college with our expert guidance.</p>
                </div>
              </div>
               {/* Bottom-Center */}
              <div className="flex flex-col items-center md:absolute md:bottom-[10%] md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 z-10">
                 <div className="w-2 h-11 bg-purple-light md:hidden"></div> {/* Mobile connector line */}
                <div className="w-48 h-48 md:w-48 md:h-48 rounded-full glass flex items-center justify-center text-center text-sm p-4 shadow-md card-hover">
                  <p className="font-semibold text-white">Hassle-Free Process – We handle the research, paperwork & strategy – you just focus on your future!</p>
                </div>
              </div>

              {/* Arrows (simplified for visual appeal, not exact connections) */}
              {/* Lines connecting central element to surrounding elements - these will only be visible on medium screens and up */}
              <svg className="hidden md:block absolute z-0" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Top-Left */}
                <line x1="50" y1="50" x2="20" y2="20" stroke="#c147e9" strokeWidth="1" />
                {/* Top-Right */}
                <line x1="50" y1="50" x2="80" y2="20" stroke="#c147e9" strokeWidth="1" />
                {/* Middle-Left */}
                <line x1="50" y1="50" x2="10" y2="50" stroke="#c147e9" strokeWidth="1" />
                {/* Middle-Right */}
                <line x1="50" y1="50" x2="90" y2="50" stroke="#c147e9" strokeWidth="1" />
                {/* Bottom-Center */}
                <line x1="50" y1="50" x2="50" y2="80" stroke="#c147e9" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* My Services Section */}
      <section
        className="py-20 bg-purple-primary/20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">My Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass rounded-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">1:1 Personalized Counseling</h3>
              <p className="text-muted-foreground">We analyze your rank, budget & interests to find the best-fit college.</p>
            </div>
            <div className="glass rounded-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.47L19.53 8.73L12 13L4.47 8.73L12 4.47ZM4 16.5V9.5L12 14L20 9.5V16.5L12 21L4 16.5Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">College Selection & Comparisons</h3>
              <p className="text-muted-foreground">Get insights into faculty, placements & infrastructure.</p>
            </div>
            <div className="glass rounded-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Admission Process Assistance</h3>
              <p className="text-muted-foreground">Step-by-step guidance for counseling rounds & documentation.</p>
            </div>
            <div className="glass rounded-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17L12 12L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Hostel & PG Support</h3>
              <p className="text-muted-foreground">Find safe & budget-friendly accommodations near your college.</p>
            </div>
            <div className="glass rounded-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M12 1L3 6V18L12 23L21 18V6L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Scholarship & Loan Guidance</h3>
              <p className="text-muted-foreground">Explore financial aid options to ease your journey.</p>
            </div>
            <div className="glass rounded-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl card-hover">
              <div className="bg-purple-light/10 p-3 rounded-full mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Post-Admission Support</h3>
              <p className="text-muted-foreground">Continued guidance even after you secure your admission.</p>
            </div>
          </div>
          {/* Add a CTA button after the services grid */}
          <div className="text-center mt-12">
            <Button
              className="bg-purple-light text-purple-dark px-8 py-4 rounded-full text-base lg:text-lg font-bold hover:bg-white transition-colors duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-light focus:ring-opacity-50 whitespace-normal"
              onClick={() => setIsDialogOpen(true)} // Open the dialog on click
            >
              Book Your Personalized Counseling
            </Button>
          </div>
        </div>
      </section>


      <div className="container py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Students Say</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm md:max-w-2xl lg:max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <div className="glass rounded-lg p-8 h-full flex flex-col justify-between card-hover">
                    <p className="text-muted-foreground mb-4 flex-grow text-left">"{testimonial.review}"</p>
                    <div className="text-right">
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.college}, {testimonial.batch}, {testimonial.program}</div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>



      {/* Why You Can’t Afford to Miss JEE Main Counseling! Section */}
      <section
        className="py-20 bg-purple-primary/20 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            <span className=" text-purple-light">Why You Can’t Afford to Miss</span> JEE Main Counseling!
          </h2>

          <div className="glass rounded-xl p-8 md:p-12 shadow-lg max-w-7xl mx-auto border border-purple-light/30">
            <p className="text-lg italic mb-8 text-muted-foreground text-center leading-relaxed">
              Making the wrong college choice can cost you your future! Don’t let confusion, misinformation, or last-minute mistakes ruin your hard-earned JEE rank. Our expert counseling ensures that you get the best college possible without stress or regret.
            </p>

            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-purple-light text-center">Still Thinking If You Need Counseling? Ask Yourself:</h3>

            <div className="space-y-6 text-left">
              <div className="flex items-start gap-4 glass rounded-lg p-5 border border-purple-light/20 card-hover">
                <ArrowRight className="text-purple-light flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-white">"Which AKTU college is actually best for me?"</h4>
                  <p className="text-muted-foreground text-base">We don’t just give you a list. We match you with the perfect college based on your rank, branch preference, placements & future prospects.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 glass rounded-lg p-5 border border-purple-light/20 card-hover">
                <ArrowRight className="text-purple-light flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-white">"What if I miss out on a better option?"</h4>
                  <p className="text-muted-foreground text-base">Many students unknowingly settle for a lower-ranked college. We analyze past cutoffs, trends & upcoming predictions so that you make the most informed decision.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 glass rounded-lg p-5 border border-purple-light/20 card-hover">
                <ArrowRight className="text-purple-light flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-white">"How do I navigate the complex admission process?"</h4>
                  <p className="text-muted-foreground text-base">One small mistake in registration, choice filling, or document submission can cost you your dream seat. We ensure zero errors, smooth processing & guaranteed clarity at every step.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 glass rounded-lg p-5 border border-purple-light/20 card-hover">
                <ArrowRight className="text-purple-light flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="text-xl font-semibold mb-1 text-white">"What if I choose the wrong branch or a college with bad placements?"</h4>
                  <p className="text-muted-foreground text-base">A poor choice now means struggles in job placements & career growth later. We guide you toward colleges with the best faculty, infrastructure & placement records.</p>
                </div>
              </div>
            </div>

            <p className="text-lg italic mt-10 mb-8 text-muted-foreground text-center leading-relaxed">
              Why take risks when expert help is just one step away? Secure your best possible seat with strategic, stress-free, and personalized counseling in just <span className='font-bold text-3xl text-purple-light' >₹799</span>
            </p>

            <div className="text-center">
                <Button
                  className="bg-purple-light text-purple-dark px-8 py-4 rounded-full text-base lg:text-lg font-bold hover:bg-white transition-colors duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-light focus:ring-opacity-50 whitespace-normal"
                  onClick={() => setIsDialogOpen(true)} // Open the dialog on click
                >
                  Book Your JEE Counseling Now
                </Button>
            </div>
          </div>
        </div>
        {/* Abstract shapes for background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-30">
          <div className="absolute w-64 h-64 bg-white rounded-full -top-20 -right-20 animate-blob animation-delay-1000"></div>
          <div className="absolute w-80 h-80 bg-white rounded-full -bottom-40 -left-40 animate-blob animation-delay-3000"></div>
        </div>
      </section>

            {/* Contact Me Section */}
            <section
        className="py-20 bg-purple-dark relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Get in Touch
          </h2>
        <p className="text-lg italic mb-10 text-muted-foreground max-w-2xl mx-auto">
            Have questions or ready to secure your future? Reach out to me directly!
          </p>

          <div className="bg-purple-primary/30 backdrop-blur-md rounded-xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto border border-purple-light/30 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="flex items-center gap-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light flex-shrink-0">
                <path d="M12 2C7.03 2 3 6.03 3 11C3 16.55 10.22 22.96 11.24 23.85C11.63 24.19 12.37 24.19 12.76 23.85C13.78 22.96 21 16.55 21 11C21 6.03 16.97 2 12 2ZM12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13Z" fill="currentColor"/>
              </svg>
              <div>
                <h4 className="font-semibold text-white">Office</h4>
                <p className="text-muted-foreground">Phase-1 , Muradnagar,Ghaziabad, Uttar Pradesh</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light flex-shrink-0">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
              </svg>
              <div>
                <h4 className="font-semibold text-white">Email</h4>
                <p className=" text-xs lg:text-base text-muted-foreground">managementsumitmishra@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-light flex-shrink-0">
                <path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19ZM16 6H8V8H16V6Z" fill="currentColor"/>
              </svg>
              <div>
                <h4 className="font-semibold text-white">Phone/WhatsApp</h4>
                <p className="text-muted-foreground">+91 83684 36583</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.000/svg" className="text-purple-light flex-shrink-0">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z" fill="currentColor"/>
              </svg>
              <div>
                <h4 className="font-semibold text-white">Website</h4>
                <p className="text-muted-foreground">www.gocampuss.com</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-white">Follow Me</h3>
            <p className="text-muted-foreground text-lg mb-6">Connect with me on social media for the latest updates and tips!</p>
            <div className="flex justify-center gap-6">
              {/* Placeholder for social media icons */}
              <a href="https://www.instagram.com/sumitsirr?igsh=MWhxNW1hOGdpeWt3MQ==" target="_blank" rel="noopener noreferrer" className="text-purple-light hover:text-white transition-colors duration-300" aria-label="Instagram">
                <Instagram size={40} />
              </a>
              <a href="https://x.com/sumitsirr?t=UBC6Tfh255kiYr1jNussGw&s=09" target="_blank" rel="noopener noreferrer" className="text-purple-light hover:text-white transition-colors duration-300" aria-label="X">
                <X size={40} />
              </a>
              <a href="https://www.linkedin.com/in/sumit-mishra77/" target="_blank" rel="noopener noreferrer" className="text-purple-light hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin size={40} />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Render the dialog here, controlled by state */}
      <JoinGroupDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default Portfolio;
