import { Link } from "react-router-dom";
import logo from '../../assets/logobg.png'
import heroImage from '../../assets/hero.jpeg'
const Footer = () => {
  return (
    <footer className="bg-purple-dark text-white py-12 relative"> {/* Added relative for positioning */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-purple-primary/50 pb-8 mb-8">
          <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-8" />

            <span className="text-xl font-bold tracking-tight">Go Campuss</span>
          </Link>
            <p className="text-muted-foreground text-lg">
              Your trusted partner in navigating AKTU admissions. We provide expert guidance for a stress-free college journey.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-purple-light hover:text-white transition-colors duration-300" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.04C2 17.04 5.66 21.21 10.53 21.96V14.24H7.56V11.28H10.53V8.91C10.53 5.92 12.33 4.24 15.04 4.24C16.35 4.24 17.71 4.47 17.71 4.47V7.3H16.2C14.76 7.3 14.5 8.22 14.5 9.14V11.28H17.56L17.06 14.24H14.5V21.96C19.34 21.21 23 17.04 23 12.04C23 6.53 18.5 2.04 12 2.04Z"/>
                </svg>
              </a>
              <a href="#" className="text-purple-light hover:text-white transition-colors duration-300" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.76 20.13 5.09 19.16 5.28C18.38 4.43 17.28 3.88 16.07 3.88C13.81 3.88 11.99 5.7 11.99 7.96C11.99 8.29 12.03 8.62 12.12 8.93C8.29 8.74 4.95 6.96 2.73 4.11C2.32 4.8 2.1 5.6 2.1 6.45C2.1 7.95 2.87 9.29 4.05 10.08C3.34 10.06 2.68 9.87 2.09 9.54V9.58C2.09 11.67 3.53 13.39 5.47 13.77C5.13 13.86 4.78 13.91 4.42 13.91C4.17 13.91 3.92 13.89 3.68 13.84C4.21 15.5 5.81 16.71 7.74 16.74C6.2 17.95 4.24 18.68 2.1 18.68C1.75 18.68 1.4 18.66 1.05 18.62C3.02 19.84 5.36 20.52 7.86 20.52C16.06 20.52 20.56 13.78 20.56 7.96C20.56 7.77 20.56 7.58 20.54 7.39C21.41 6.78 22.04 6.01 22.46 6Z"/>
                </svg>
              </a>
              <a href="#" className="text-purple-light hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM8 19H5V9H8V19ZM6.5 7.32C5.5 7.32 4.67 6.5 4.67 5.5C4.67 4.5 5.5 3.67 6.5 3.67C7.5 3.67 8.33 4.5 8.33 5.5C8.33 6.5 7.5 7.32 6.5 7.32ZM19 19H16V13.5C16 12.12 15.28 11.5 14.5 11.5C13.72 11.5 13 12.12 13 13.5V19H10V9H13V10.5C13.5 9.75 14.5 9 15.5 9C17.5 9 19 10.5 19 13.5V19Z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-purple-light transition-colors">Home</Link></li>
              <li><Link to="/portfolio" className="text-muted-foreground hover:text-purple-light transition-colors">Our Expert</Link></li>
              <li><Link to="/college-search" className="text-muted-foreground hover:text-purple-light transition-colors">College Search</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-4">Contact Us</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: gocampuss7@gmail.com</li>
              <li>Phone: +91 83684 36583</li>
              <li>Address: Phase-1 , Muradnagar,Ghaziabad, Uttar Pradesh</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Gocampuss. All rights reserved.
        </div>

        <div className="fixed bottom-4 right-4 flex items-center text-muted-foreground text-sm z-10 group bg-gray-800 p-2 rounded-md shadow-lg"> {/* Added background, padding, rounded corners, and shadow */}
          Made with <span className="text-red-500 mx-1">❤️</span> by
          <a href="https://www.linkedin.com/in/harsh-vardhan-singh-2ab454257/" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-purple-light transition-colors transform group-hover:scale-110"> {/* Added transform and group-hover:scale-110 */}
            <img src={heroImage} alt="Hero" className="inline-block text-xl rounded-full h-8 w-8 object-cover" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
