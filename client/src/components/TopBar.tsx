import { Menu, X, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { isAuthenticated, logout } from "@/lib/authUtils";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status
    setIsSignedIn(isAuthenticated());
    // Get user role from localStorage or wherever it's stored
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("overflow-hidden"); // Optional: prevent body scrolling when menu is open
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        menuOpen &&
        !target.closest(".site-mobile-menu") &&
        !target.closest(".js-menu-toggle") &&
        target.classList.contains("site-wrap")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <div className="relative">
      {/* Mobile Menu Overlay - z-index increased */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300"
          onClick={handleMenuToggle}
        />
      )}

      {/* Mobile Menu - z-index increased */}
      <div
        className={`fixed w-[300px] h-full right-0 top-0 bg-white z-[9999] shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-primary">Samarth Clinic</h2>
              <p className="text-sm text-gray-600">
                Physiotherapy Rehabilitation Center
              </p>
            </div>
            <button
              onClick={handleMenuToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Menu Items */}
          <nav>
            <ul className="space-y-1">
              <li>
                <a
                  href="#home"
                  className="block py-3 px-4 rounded-md hover:bg-gray-100 transition-colors text-gray-800 font-medium"
                  onClick={handleMenuToggle}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block py-3 px-4 rounded-md hover:bg-gray-100 transition-colors text-gray-800 font-medium"
                  onClick={handleMenuToggle}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-3 px-4 rounded-md hover:bg-gray-100 transition-colors text-gray-800 font-medium"
                  onClick={handleMenuToggle}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="block py-3 px-4 rounded-md hover:bg-gray-100 transition-colors text-gray-800 font-medium"
                  onClick={handleMenuToggle}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block py-3 px-4 rounded-md hover:bg-gray-100 transition-colors text-gray-800 font-medium"
                  onClick={handleMenuToggle}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Authentication Section */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            {isSignedIn ? (
              <div className="space-y-3">
                {userRole === "doctor" && (
                  <Button
                    onClick={() => {
                      window.location.href = "/dashboard";
                    }}
                    className="w-full mb-2"
                    variant="outline"
                  >
                    Doctor Dashboard
                  </Button>
                )}
                <Button
                  onClick={() => {
                    logout();
                    setIsSignedIn(false);
                    setUserRole(null);
                  }}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {" "}
                <Button
                  onClick={() => {
                    window.location.href = "/admin-firewall";
                  }}
                  className="w-full universal-button"
                  variant="default"
                >
                  Doctor Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <header className="site-navbar" role="banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-8 col-xl-4">
              <h1 className="mb-0 site-logo">
                <a href="#home" className="text-white mb-0 font-bold">
                  Samarth Clinic<span className="text-primary">.</span>
                </a>
              </h1>
              <p className="text-white mb-0" style={{ fontSize: "0.7rem" }}>
                Physiotherapy Rehabilitation Center
              </p>
            </div>
            {/* Fixed alignment of menu icon with flex classes */}
            <div className="col-4 col-md-3 d-xl-none text-right flex items-center justify-end h-full">
              <a
                href="#"
                className="site-menu-toggle js-menu-toggle text-[#3a9efd]"
                onClick={handleMenuToggle}
              >
                <span className="icon-menu h3">
                  <Menu />
                </span>
              </a>
            </div>
            <div className="col-12 col-md-8 d-none d-xl-block">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li className="active">
                    <a
                      href="#home"
                      className="text-[#2d405f] hover:text-[#3a9efd] transition-colors"
                    >
                      <span>Home</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-[#2d405f] hover:text-[#3a9efd] transition-colors"
                    >
                      <span>Services</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="text-[#2d405f] hover:text-[#3a9efd] transition-colors"
                    >
                      <span>About Us</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#blog"
                      className="text-[#2d405f] hover:text-[#3a9efd] transition-colors"
                    >
                      <span>Blog</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-[#2d405f] hover:text-[#3a9efd] transition-colors"
                    >
                      <span>Contact Us</span>
                    </a>
                  </li>
                  {isSignedIn ? (
                    <>
                      {userRole === "doctor" && (
                        <li className="px-4" style={{ padding: "10px 0" }}>
                          <button
                            onClick={() => {
                              window.location.href = "/dashboard";
                            }}
                            className="text-[#3a9efd]"
                          >
                            Dashboard
                          </button>
                        </li>
                      )}
                      <li style={{ padding: "10px 0" }}>
                        <button
                          onClick={() => {
                            logout();
                            setIsSignedIn(false);
                            setUserRole(null);
                          }}
                          className="text-[#3a9efd]"
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="px-1" style={{ padding: "10px 0" }}>
                        {" "}
                        <Button
                          onClick={() => {
                            window.location.href = "/admin-firewall";
                          }}
                          variant={"outline"}
                          className="flex gap-2 items-center universal-button-outline hover:bg-gray-50"
                        >
                          <UserCog size={16} />
                          Doctor Login
                        </Button>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TopBar;
