// Google OAuth Configuration
export const GOOGLE_OAUTH_CONFIG = {
  // This will be replaced with your actual Google Client ID
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id-here',
  // Scopes for Google OAuth
  scope: 'email profile',
  // Redirect URI (should match what you configured in Google Console)
  redirectUri: window.location.origin,
};

// Google OAuth helper functions
export const googleOAuthHelpers = {
  // Validate Google ID token
  validateGoogleToken: async (idToken: string) => {
    try {
      // This will be handled by the backend
      const response = await fetch('https://api.pulasa.com/api/auth/google/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Google token validation error:', error);
      throw error;
    }
  },
};
