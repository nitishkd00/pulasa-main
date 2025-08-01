import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import unifiedAuthService from "@/services/UnifiedAuthService";
import NavigationHeader from "@/components/NavigationHeader";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  wallet_balance: number;
  locked_amount: number;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts
  useScrollToTop();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current user from MongoDB auth service
        const currentUser = await unifiedAuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          toast.error("Please login to view your profile");
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await unifiedAuthService.logout();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
          <Button onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--secondary))]">
      <NavigationHeader />
      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg border border-[hsl(var(--border))] p-8">
            <h1 className="text-3xl font-bold text-[hsl(var(--primary))] mb-8 text-center">Profile Information</h1>
            
            <div className="space-y-6">
              <div className="border-b border-[hsl(var(--border))] pb-4">
                <label className="text-sm font-medium text-[hsl(var(--muted-foreground))] block mb-1">Name</label>
                <p className="text-lg font-semibold text-[hsl(var(--foreground))]">{user.name}</p>
              </div>
              
              <div className="border-b border-[hsl(var(--border))] pb-4">
                <label className="text-sm font-medium text-[hsl(var(--muted-foreground))] block mb-1">Email</label>
                <p className="text-lg text-[hsl(var(--foreground))]">{user.email}</p>
              </div>
              
              {user.phone && (
                <div className="border-b border-[hsl(var(--border))] pb-4">
                  <label className="text-sm font-medium text-[hsl(var(--muted-foreground))] block mb-1">Phone</label>
                  <p className="text-lg text-[hsl(var(--foreground))]">{user.phone}</p>
                </div>
              )}
              
              {user.address && (
                <div className="border-b border-[hsl(var(--border))] pb-4">
                  <label className="text-sm font-medium text-[hsl(var(--muted-foreground))] block mb-1">Address</label>
                  <p className="text-lg text-[hsl(var(--foreground))]">{user.address}</p>
                </div>
              )}
              
              <div className="pb-4">
                <label className="text-sm font-medium text-[hsl(var(--muted-foreground))] block mb-1">Member Since</label>
                <p className="text-lg text-[hsl(var(--foreground))]">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
              
              <div className="pt-6">
                <Button 
                  onClick={handleLogout} 
                  className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-[hsl(var(--accent-foreground))] font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
