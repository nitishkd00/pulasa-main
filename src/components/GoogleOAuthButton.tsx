import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import unifiedAuthService from '@/services/UnifiedAuthService';

interface GoogleOAuthButtonProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
  variant?: 'login' | 'signup';
  className?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleOAuthButton: React.FC<GoogleOAuthButtonProps> = ({
  onSuccess,
  onError,
  variant = 'login',
  className = ''
}) => {
  const [loading, setLoading] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const checkGoogleIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Initialize Google OAuth
  const initializeGoogleOAuth = React.useCallback(() => {
    if (!window.google || isInitialized) return;

    try {
      const google = window.google;
      
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
        callback: async (response: any) => {
          if (response.error) {
            console.error('Google OAuth error:', response.error);
            toast.error('Google authentication failed');
            onError?.('Google authentication failed');
            setLoading(false);
            return;
          }

          try {
            console.log('🔐 Google OAuth successful, sending ID token to backend');
            
            // Send the ID token to our backend
            const result = await unifiedAuthService.googleLogin(response.credential);
            
            if (result.success && result.user) {
              toast.success(`Successfully ${variant === 'login' ? 'signed in' : 'signed up'} with Google!`);
              onSuccess?.(result.user);
            } else {
              toast.error(result.error || `Google ${variant} failed`);
              onError?.(result.error || `Google ${variant} failed`);
            }
          } catch (error) {
            console.error('Google OAuth error:', error);
            toast.error('An error occurred during Google authentication');
            onError?.('An error occurred during Google authentication');
          } finally {
            setLoading(false);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });

      setIsInitialized(true);
    } catch (error) {
      console.error('Google OAuth initialization error:', error);
      toast.error('Failed to initialize Google OAuth');
      onError?.('Failed to initialize Google OAuth');
      setLoading(false);
    }
  }, [isInitialized, onError, onSuccess, variant]);

  // Initialize on component mount
  React.useEffect(() => {
    if (window.google) {
      initializeGoogleOAuth();
    } else {
      // Wait for Google script to load
      checkGoogleIntervalRef.current = setInterval(() => {
        if (window.google) {
          if (checkGoogleIntervalRef.current) {
            clearInterval(checkGoogleIntervalRef.current);
            checkGoogleIntervalRef.current = null;
          }
          initializeGoogleOAuth();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => {
        if (checkGoogleIntervalRef.current) {
          clearInterval(checkGoogleIntervalRef.current);
          checkGoogleIntervalRef.current = null;
        }
      }, 10000);
    }

    // Cleanup function
    return () => {
      if (checkGoogleIntervalRef.current) {
        clearInterval(checkGoogleIntervalRef.current);
        checkGoogleIntervalRef.current = null;
      }
      
      // Cancel any active Google OAuth prompts
      if (window.google && window.google.accounts && window.google.accounts.id) {
        try {
          window.google.accounts.id.cancel();
        } catch (e) {
          // Ignore errors if no prompt is active
        }
      }
    };
  }, [initializeGoogleOAuth]);

  const handleGoogleLogin = async () => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      // Check if Google OAuth is available
      if (!window.google) {
        toast.error('Google OAuth is not available. Please refresh the page and try again.');
        setLoading(false);
        return;
      }

      const google = window.google;

      // Re-initialize if needed
      if (!isInitialized) {
        initializeGoogleOAuth();
      }

      // Clear any existing prompts
      try {
        google.accounts.id.cancel();
      } catch (e) {
        // Ignore errors if no prompt is active
      }

      // Prompt the user to sign in
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.log('Google OAuth prompt not displayed');
          toast.error('Google sign-in popup was blocked. Please allow popups and try again.');
          setLoading(false);
        } else if (notification.isSkippedMoment()) {
          console.log('Google OAuth prompt skipped');
          toast.error('Google sign-in was skipped. Please try again.');
          setLoading(false);
        } else if (notification.isDismissedMoment()) {
          console.log('Google OAuth prompt dismissed');
          toast.error('Google sign-in was cancelled. Please try again.');
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Google OAuth error:', error);
      toast.error('Failed to start Google authentication. Please try again.');
      onError?.('Failed to start Google authentication');
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`w-full flex items-center justify-center space-x-2 ${className}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )}
      <span>
        {loading 
          ? `Signing ${variant === 'login' ? 'in' : 'up'}...` 
          : `Continue with Google`
        }
      </span>
    </Button>
  );
};

export default GoogleOAuthButton;
