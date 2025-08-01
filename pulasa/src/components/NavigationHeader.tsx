import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import unifiedAuthService from "@/services/UnifiedAuthService";
import NotificationService from "@/services/NotificationService";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
// import LocationDialog from "./LocationDialog";

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 inline-block mr-1"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0l1.7 6.374a2.25 2.25 0 002.183 1.704h7.299a2.25 2.25 0 002.183-1.704l1.7-6.374m-15.352 0h15.352M6.75 21a.75.75 0 100-1.5.75.75 0 000 1.5zm10.5 0a.75.75 0 100-1.5.75.75 0 000 1.5z"
    />
  </svg>
);

const NavigationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  
  // Only calculate totalItems if user is not admin
  const totalItems = role !== "admin" ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current user from MongoDB auth service
        const currentUser = await unifiedAuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setRole(currentUser.is_admin ? 'admin' : 'user');
          
          // Fetch notifications for the user
          const userNotifications = await NotificationService.getUserNotifications();
          setNotifications(userNotifications);
        } else {
          setUser(null);
          setRole(null);
          setNotifications([]);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUser(null);
        setRole(null);
        setNotifications([]);
      }
    };
    fetchUserData();
  }, []);

  // Handle clicking outside notification dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleLogout = async () => {
    try {
      await unifiedAuthService.logout();
      setUser(null);
      setRole(null);
      navigate("/");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAuctionNavigation = async () => {
    console.log('🎯 PULASA NAVIGATION: Auction navigation clicked');

    if (user) {
      console.log(`👤 PULASA NAVIGATION: User logged in: ${user.email}`);

      try {
        let authToken = unifiedAuthService.getCurrentToken();
        console.log(`🎫 PULASA NAVIGATION: Current token: ${authToken ? 'Available' : 'Not available'}`);

        if (!authToken) {
          console.log('🔐 PULASA NAVIGATION: No unified auth token found, attempting to authenticate...');

          // Show loading indicator
          const loadingToast = toast.loading('Authenticating for auction access...');

          // Try to authenticate with unified auth
          const loginResult = await unifiedAuthService.login(user.email, 'pulasa2025'); // Default password for migrated users

          toast.dismiss(loadingToast);

          if (loginResult && loginResult.success) {
            authToken = unifiedAuthService.getCurrentToken();
            console.log('✅ PULASA NAVIGATION: Successfully authenticated with unified auth');
            console.log(`🎫 PULASA NAVIGATION: New token obtained: ${authToken ? 'Yes' : 'No'}`);

            if (!authToken) {
              console.error('❌ PULASA NAVIGATION: Token not available after successful login');
              toast.error('Authentication failed - please try again');
              return;
            }

            toast.success('Authentication successful! Opening auction app...');
          } else {
            console.error('❌ PULASA NAVIGATION: Unified auth login failed:', loginResult?.error);
            toast.error('Authentication failed - opening auction app for manual login');
            console.log('🔄 PULASA NAVIGATION: Redirecting to auction app for manual login...');
            const auctionUrl = process.env.VITE_AUCTION_CLIENT_URL || 'https://auction.pulasa.com';
            window.open(auctionUrl, '_blank', 'noopener,noreferrer');
            return;
          }
        } else {
          console.log('✅ PULASA NAVIGATION: Using existing auth token');
          toast.success('Opening auction app with existing authentication...');
        }

        if (authToken) {
          // Validate token before using it
          console.log('🔍 PULASA NAVIGATION: Validating token before transfer...');
          try {
            const validation = await unifiedAuthService.validateToken(authToken);
            if (!validation.success || !validation.valid) {
              console.error('❌ PULASA NAVIGATION: Token validation failed');
              toast.error('Authentication token invalid - please try again');
              unifiedAuthService.clearSession();
              return;
            }
            console.log('✅ PULASA NAVIGATION: Token validation successful');
          } catch (validationError) {
            console.error('❌ PULASA NAVIGATION: Token validation error:', validationError);
            toast.error('Authentication validation failed - please try again');
            return;
          }

          const auctionBaseUrl = process.env.VITE_AUCTION_CLIENT_URL || 'https://auction.pulasa.com';
          const auctionUrl = `${auctionBaseUrl}?auth=${encodeURIComponent(authToken)}`;
          console.log('🚀 PULASA NAVIGATION: Opening auction app with authentication token');
          console.log(`🔗 PULASA NAVIGATION: URL: ${auctionUrl.substring(0, 80)}...`);
          console.log(`👤 PULASA NAVIGATION: User: ${user.email}`);
          console.log(`🎫 PULASA NAVIGATION: Token length: ${authToken.length}`);

          // Open in new tab with a slight delay to ensure everything is ready
          setTimeout(() => {
            window.open(auctionUrl, '_blank', 'noopener,noreferrer');
            console.log('✅ PULASA NAVIGATION: Auction app opened successfully');
          }, 500);

        } else {
          console.log('⚠️ PULASA NAVIGATION: No token available - opening auction app without authentication');
          toast.warning('Opening auction app - please login manually');
          const auctionUrl = process.env.VITE_AUCTION_CLIENT_URL || 'https://auction.pulasa.com';
          window.open(auctionUrl, '_blank', 'noopener,noreferrer');
        }
      } catch (error) {
        console.error('❌ PULASA NAVIGATION: Failed to get unified auth token:', error);
        toast.error('Authentication error - opening auction app for manual login');
        console.log('🔄 PULASA NAVIGATION: Falling back to opening auction app without authentication');
        const auctionUrl = process.env.VITE_AUCTION_CLIENT_URL || 'https://auction.pulasa.com';
        window.open(auctionUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      console.log('👤 PULASA NAVIGATION: No user logged in - opening auction app');
      toast.info('Please login to access auctions');
      const auctionUrl = process.env.VITE_AUCTION_CLIENT_URL || 'https://auction.pulasa.com';
      window.open(auctionUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNotificationToggle = async () => {
    const newShowState = !showNotifications;
    setShowNotifications(newShowState);
    
    // If opening notifications, mark all unread notifications as read
    if (newShowState && notifications.some(n => !n.read)) {
      try {
        // Mark all unread notifications as read
        const unreadNotifications = notifications.filter(n => !n.read);
        const markAsReadPromises = unreadNotifications.map(notification => 
          NotificationService.markAsRead(notification.id)
        );
        
        await Promise.all(markAsReadPromises);
        
        // Update local state to reflect the changes
        setNotifications(prev => prev.map(notification => ({
          ...notification,
          read: true
        })));
        
        console.log('✅ All notifications marked as read');
      } catch (error) {
        console.error('Failed to mark notifications as read:', error);
      }
    }
  };

  const handleNotificationClick = async (notification) => {
    // Mark individual notification as read if it's not already read
    if (!notification.read) {
      try {
        await NotificationService.markAsRead(notification.id);
        
        // Update local state
        setNotifications(prev => prev.map(n => 
          n.id === notification.id ? { ...n, read: true } : n
        ));
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[hsl(var(--secondary))]/80 backdrop-blur-md border-b border-[hsl(var(--border))]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with ripple animation */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="https://res.cloudinary.com/ddw4avyim/image/upload/v1752650318/WhatsApp_Image_2025-07-16_at_12.47.22_PM_1_eab8kb.jpg"
                alt="Pulasa.com Logo"
                className="w-10 h-10 object-contain rounded-full shadow-md"
              />
              <h1 className="text-2xl font-bold text-[hsl(var(--primary))] tracking-wide group-hover:text-[hsl(var(--accent))] transition-colors">
                Pulasa<span className="text-[hsl(var(--accent))]">.com</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium"
            >
              Blogs
            </Link>
            <Link
              to="/products"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium"
            >
              Fresh Catch
            </Link>
            <button
              onClick={() => handleAuctionNavigation()}
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium flex items-center cursor-pointer"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Auctions
            </button>
            {user ? (
              role === "admin" ? (
                <>
                  <Link to="/admin-dashboard">
                    <Button className="bg-white border border-[hsl(var(--accent))] text-[hsl(var(--accent))] px-6 py-2 rounded-full hover:bg-[hsl(var(--accent))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-2">
                      Admin Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button className="bg-[hsl(var(--accent))] border border-[hsl(var(--accent))] text-white px-6 py-2 rounded-full hover:bg-[hsl(var(--primary))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-2">
                      Profile
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-[hsl(var(--secondary))] border border-[hsl(var(--accent))] text-[hsl(var(--accent))] px-6 py-2 rounded-full hover:bg-[hsl(var(--accent))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/profile">
                    <Button className="bg-[hsl(var(--accent))] border border-[hsl(var(--accent))] text-white px-6 py-2 rounded-full hover:bg-[hsl(var(--primary))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-2">
                      Profile
                    </Button>
                  </Link>
                  <Link to="/orders">
                    <Button className="bg-white border border-[hsl(var(--accent))] text-[hsl(var(--accent))] px-6 py-2 rounded-full hover:bg-[hsl(var(--accent))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-2">
                      My Orders
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="bg-[hsl(var(--secondary))] border border-[hsl(var(--accent))] text-[hsl(var(--accent))] px-6 py-2 rounded-full hover:bg-[hsl(var(--accent))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-2"
                  >
                    Logout
                  </Button>
                </>
              )
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-white border border-[hsl(var(--accent))] text-[hsl(var(--accent))] px-6 py-2 rounded-full hover:bg-[hsl(var(--accent))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-2">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[hsl(var(--accent))] border border-[hsl(var(--accent))] text-white px-6 py-2 rounded-full hover:bg-[hsl(var(--primary))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {/* {user && role !== "admin" && (
              <LocationDialog />
            )} */}
            {/* Notification Bell */}
            {user && (
              <div className="relative">
                <button
                  onClick={handleNotificationToggle}
                  className="relative p-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75l-2.25 2.25v3h15v-3L15.75 12.75V9.75a6 6 0 00-6-6z" />
                  </svg>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                      {notifications.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No notifications</p>
                      ) : (
                        <div className="space-y-3">
                          {notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                                notification.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                              }`}
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{notification.title}</h4>
                                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-2">
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <ThemeToggle />
            {role !== "admin" && (
              <Link to="/cart">
                <Button className="bg-white border border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-5 py-2 rounded-full hover:bg-[hsl(var(--primary))] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ml-2 flex items-center">
                  <CartIcon />
                  Cart ({totalItems})
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span
                className={`w-full h-0.5 bg-[hsl(var(--primary))] transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-[hsl(var(--primary))] transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-[hsl(var(--primary))] transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/90 backdrop-blur-md rounded-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                to="/"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/blogs"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium"
              >
                Blogs
              </Link>
              <Link
                to="/products"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium"
              >
                Fresh Catch
              </Link>
              <button
                onClick={() => handleAuctionNavigation()}
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Auction
              </button>
              {user ? (
                role === "admin" ? (
                  <>
                    <Link to="/admin-dashboard">
                      <Button className="bg-white border border-[hsl(var(--accent))] text-[hsl(var(--accent))] w-full rounded-full hover:bg-[hsl(var(--accent))] hover:text-white">
                        Admin Dashboard
                      </Button>
                    </Link>
                    <Link to="/profile">
                      <Button className="bg-[hsl(var(--accent))] border border-[hsl(var(--accent))] text-white w-full rounded-full hover:bg-[hsl(var(--primary))] hover:text-white">
                        Profile
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="bg-[hsl(var(--secondary))] border border-[hsl(var(--accent))] text-[hsl(var(--accent))] w-full rounded-full hover:bg-[hsl(var(--accent))] hover:text-white"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/profile">
                      <Button className="bg-[hsl(var(--accent))] border border-[hsl(var(--accent))] text-white w-full rounded-full hover:bg-[hsl(var(--primary))] hover:text-white">
                        Profile
                      </Button>
                    </Link>
                    <Link to="/orders">
                      <Button className="bg-white border border-[hsl(var(--accent))] text-[hsl(var(--accent))] w-full rounded-full hover:bg-[hsl(var(--accent))] hover:text-white">
                        My Orders
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="bg-[hsl(var(--secondary))] border border-[hsl(var(--accent))] text-[hsl(var(--accent))] w-full rounded-full hover:bg-[hsl(var(--accent))] hover:text-white"
                    >
                      Logout
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Link to="/login">
                    <Button className="bg-white border border-[hsl(var(--accent))] text-[hsl(var(--accent))] w-full rounded-full hover:bg-[hsl(var(--accent))] hover:text-white">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[hsl(var(--accent))] border border-[hsl(var(--accent))] text-white w-full rounded-full hover:bg-[hsl(var(--primary))] hover:text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              {/* {user && role !== "admin" && (
                <LocationDialog />
              )} */}
              {role !== "admin" && (
                <Link to="/cart" className="w-full">
                  <Button className="bg-white border border-[hsl(var(--primary))] text-[hsl(var(--primary))] w-full rounded-full hover:bg-[hsl(var(--primary))] hover:text-white flex items-center justify-center">
                    <CartIcon />
                    Cart ({totalItems})
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationHeader;
