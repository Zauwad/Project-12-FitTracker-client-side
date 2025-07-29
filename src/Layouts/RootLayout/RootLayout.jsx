import { Outlet } from "react-router";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navbar */}
      <Navbar />

      {/* Main content expands to push footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always stays at bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;
