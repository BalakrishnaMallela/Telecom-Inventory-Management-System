import { useState } from "react";
import { motion } from "motion/react";
import { Home, Bell, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  // Navigation handlers
  const handleHomeClick = () => {
    console.log("Home clicked");
    // Add your home navigation logic here
    // Example: router.push('/') or window.location.href = '/'
  };

  const handleAboutClick = () => {
    console.log("About clicked");
    // Add your about navigation logic here
    // Example: router.push('/about')
  };

  const handleContactClick = () => {
    console.log("Contact clicked");
    // Add your contact navigation logic here
    // Example: router.push('/contact')
  };

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
    // Add your notification logic here
    // Example: open notification panel, router.push('/notifications')
    setNotificationCount(0); // Clear notifications for demo
  };

  const handleLoginClick = () => {
    console.log("Login clicked");
    // Add your login logic here
    // Example: router.push('/login') or open login modal
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu toggled:", !isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-white cursor-pointer"
              onClick={handleHomeClick}
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                YourBrand
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              
              {/* Home Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHomeClick}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
              >
                <Home size={18} className="text-blue-400" />
                <span>Home</span>
              </motion.button>

              {/* About Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAboutClick}
                className="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300"
              >
                About
              </motion.button>

              {/* Contact Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className="px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300"
              >
                Contact
              </motion.button>

              {/* Notification Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNotificationClick}
                className="relative p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
              >
                <Bell size={20} className="text-blue-400" />
                {notificationCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {notificationCount}
                  </motion.div>
                )}
              </motion.button>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoginClick}
                className="flex items-center space-x-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <User size={18} />
                <span>Login</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button (3 lines) */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleMenuToggle}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 backdrop-blur-sm border border-white/10"
            >
              {isMenuOpen ? (
                <X size={24} className="text-blue-400" />
              ) : (
                <Menu size={24} className="text-blue-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/50 rounded-lg mt-2 backdrop-blur-sm border border-white/10">
            
            {/* Mobile Home */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleHomeClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
            >
              <Home size={20} className="text-blue-400" />
              <span className="font-medium">Home</span>
            </motion.button>

            {/* Mobile About */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleAboutClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <span className="font-medium">About</span>
            </motion.button>

            {/* Mobile Contact */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleContactClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <span className="font-medium">Contact</span>
            </motion.button>

            {/* Mobile Notifications */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleNotificationClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-blue-400" />
                <span className="font-medium">Notifications</span>
              </div>
              {notificationCount > 0 && (
                <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {notificationCount}
                </div>
              )}
            </motion.button>

            {/* Mobile Login */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleLoginClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold transition-all duration-300 mt-2"
            >
              <User size={20} />
              <span>Login</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Glassmorphism Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 pointer-events-none" />
    </nav>
  );
}
