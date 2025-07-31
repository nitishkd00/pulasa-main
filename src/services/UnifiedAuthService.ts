import axios from 'axios';

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

interface AuthTokens {
  jwtToken: string;
  tokenType: string;
  expiresIn: string;
}

interface AuthResponse {
  success: boolean;
  user: User;
  tokens: AuthTokens;
  source: string;
}

interface ValidationResponse {
  success: boolean;
  valid: boolean;
  user: User;
  source: string;
}

class UnifiedAuthService {
  private baseURL: string;
  private sessionKey: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_UNIFIED_AUTH_URL || 'http://localhost:6001';
    this.sessionKey = 'pulasa_unified_session';
    
    // Configure axios defaults
    axios.defaults.withCredentials = true;
  }

  /**
   * Initialize authentication service
   */
  async initialize(): Promise<User | null> {
    try {
      // Check for existing session
      const session = this.getStoredSession();
      if (session && session.tokens) {
        // Validate stored token
        const validation = await this.validateToken(session.tokens.jwtToken);
        if (validation.success) {
          this.setAuthHeader(session.tokens.jwtToken);
          return validation.user;
        } else {
          // Clear invalid session
          this.clearSession();
        }
      }
      return null;
    } catch (error) {
      console.error('Auth initialization failed:', error);
      this.clearSession();
      return null;
    }
  }

  /**
   * Login user with unified authentication
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await axios.post<AuthResponse>(`${this.baseURL}/api/auth/login`, {
        email,
        password
      });

      if (response.data.success) {
        // Store session data
        this.storeSession(response.data);
        
        // Set auth header for future requests
        this.setAuthHeader(response.data.tokens.jwtToken);
        
        return {
          success: true,
          user: response.data.user
        };
      } else {
        return {
          success: false,
          error: 'Login failed'
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const axiosError = error as { response?: { data?: { error?: string } } };
      return {
        success: false,
        error: axiosError.response?.data?.error || errorMessage || 'Login failed'
      };
    }
  }

  /**
   * Register user with unified authentication
   */
  async register(userData: { email: string; password: string; name: string; phone?: string; address?: string }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await axios.post<AuthResponse>(`${this.baseURL}/api/auth/register`, userData);

      if (response.data.success) {
        // Store session data
        this.storeSession(response.data);
        
        // Set auth header for future requests
        this.setAuthHeader(response.data.tokens.jwtToken);
        
        return {
          success: true,
          user: response.data.user
        };
      } else {
        return {
          success: false,
          error: 'Registration failed'
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const axiosError = error as { response?: { data?: { error?: string } } };
      return {
        success: false,
        error: axiosError.response?.data?.error || errorMessage || 'Registration failed'
      };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const session = this.getStoredSession();
      if (session && session.user) {
        return session.user;
      }

      // Try to get from profile endpoint
      const profile = await this.getProfile();
      if (profile.success && profile.user) {
        return profile.user;
      }

      return null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Validate token
   */
  async validateToken(token: string): Promise<ValidationResponse> {
    try {
      const response = await axios.post<ValidationResponse>(`${this.baseURL}/api/auth/validate`, {
        token
      });

      return response.data;
    } catch (error) {
      return {
        success: false,
        valid: false,
        user: {} as User,
        source: 'error'
      };
    }
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await axios.get<{ success: boolean; user: User }>(`${this.baseURL}/api/auth/profile`);
      
      if (response.data.success) {
        return {
          success: true,
          user: response.data.user
        };
      } else {
        return {
          success: false,
          error: 'Failed to get profile'
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const axiosError = error as { response?: { data?: { error?: string } } };
      return {
        success: false,
        error: axiosError.response?.data?.error || errorMessage || 'Failed to get profile'
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint
      await axios.post(`${this.baseURL}/api/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearSession();
      this.clearAuthHeader();
    }
  }

  /**
   * Get current authentication token
   */
  getCurrentToken(): string | null {
    const session = this.getStoredSession();
    return session?.tokens?.jwtToken || null;
  }

  /**
   * Clear session (alias for logout)
   */
  clearSession(): void {
    localStorage.removeItem(this.sessionKey);
  }

  /**
   * Store session data in localStorage
   */
  storeSession(sessionData: AuthResponse): void {
    const session = {
      user: sessionData.user,
      tokens: sessionData.tokens,
      timestamp: Date.now()
    };
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  /**
   * Get stored session from localStorage
   */
  getStoredSession(): { user: User; tokens: AuthTokens; timestamp: number } | null {
    try {
      const session = localStorage.getItem(this.sessionKey);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Set authorization header for axios
   */
  setAuthHeader(token: string): void {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear authorization header
   */
  clearAuthHeader(): void {
    delete axios.defaults.headers.common['Authorization'];
  }
}

// Export singleton instance
const unifiedAuthService = new UnifiedAuthService();
export default unifiedAuthService;
