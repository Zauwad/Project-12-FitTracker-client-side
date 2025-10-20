import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-[#2C2C30] text-base-content py-10 mt-10 bg-[#0C0C0E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-[#E0E0E0]">
        
        {/* Logo & Name */}
        <div>
          <Link to="/" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Fit<span className="text-[#17CF63]">Track</span>
        </Link>
          <p className="mt-3 text-sm text-[#9F9FA8] leading-relaxed">
            Empowering your fitness journey with technology and community.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
          <ul className="space-y-1 text-[#9F9FA8] text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@fittrackerpro.com"
                className="text-[#17CF63] hover:underline"
              >
                support@fittrackerpro.com
              </a>
            </li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Fitness Street, Wellness City</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex gap-4 text-sm text-[#9F9FA8]">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#17CF63] transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#17CF63] transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#17CF63] transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="mt-8 pt-4 border-t border-[#2C2C30] text-sm text-[#9F9FA8]">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">FitTrackerPro</span>. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
