import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content p-6 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Logo & Name */}
        <div>
          <h2 className="text-2xl font-bold text-primary">FitTrackerPro</h2>
          <p className="mt-2 text-sm">
            Empowering your fitness journey with technology and community.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: <a href="mailto:support@fittrackerpro.com" className="link">support@fittrackerpro.com</a></p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Fitness Street, Wellness City</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="link link-hover">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="link link-hover">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link link-hover">Instagram</a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-6 border-t border-base-300 pt-4 text-center text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">FitTrackerPro</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
