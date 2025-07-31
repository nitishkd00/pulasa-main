// MongoDB Service Configuration
const MONGODB_CONFIG = {
  uri: import.meta.env.VITE_MONGODB_URI || 'mongodb+srv://nitishkumardevoju:muwLYrPn5blRAGCd@pulasa.sjvscku.mongodb.net/?retryWrites=true&w=majority&appName=pulasa'
};

const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:6001',
  authService: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    profile: '/api/auth/profile',
    logout: '/api/auth/logout',
    validate: '/api/auth/validate'
  }
};

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  is_admin: boolean;
  wallet_balance: number;
  locked_amount: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  amount: number;
  order_number: string;
  products: Array<{
    product_id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  address?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
  status: string;
  upi_reference?: string;
  created_at: string;
  updated_at: string;
}

class MongoDBService {
  private baseUrl: string;
  private sessionKey: string;

  constructor() {
    this.baseUrl = 'https://pulasa-auth-service.onrender.com';
    this.sessionKey = 'pulasa_unified_session';
  }

  private getCurrentToken(): string | null {
    try {
      const session = localStorage.getItem(this.sessionKey);
      if (session) {
        const sessionData = JSON.parse(session);
        return sessionData.tokens?.jwtToken || null;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  // Authentication methods
  async login(email: string, password: string): Promise<{ success: boolean; token?: string; user?: User; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.authService.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('pulasa_ecommerce_token', data.token);
        return { success: true, token: data.token, user: data.user };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async register(userData: { email: string; password: string; name: string; phone?: string; address?: string }): Promise<{ success: boolean; token?: string; user?: User; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.authService.register}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('pulasa_ecommerce_token', data.token);
        return { success: true, token: data.token, user: data.user };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getCurrentToken();
      if (!token) return null;

      const response = await fetch(`${this.baseUrl}${API_CONFIG.authService.profile}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        return data.user;
      } else {
        // Token might be invalid, remove it
        this.clearSession();
        return null;
      }
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getCurrentToken();
      if (token) {
        await fetch(`${this.baseUrl}${API_CONFIG.authService.logout}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearSession();
    }
  }

  private clearSession(): void {
    localStorage.removeItem(this.sessionKey);
  }

  async validateToken(token: string): Promise<{ success: boolean; valid: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.authService.validate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, valid: data.valid, user: data.user };
      } else {
        return { success: false, valid: false, error: data.error };
      }
    } catch (error) {
      console.error('Token validation error:', error);
      return { success: false, valid: false, error: 'Network error' };
    }
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    try {
      const token = this.getCurrentToken();
      const response = await fetch(`${this.baseUrl}/api/products`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const data = await response.json();
      return data.success ? data.products : [];
    } catch (error) {
      console.error('Get products error:', error);
      return [];
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const token = this.getCurrentToken();
      const response = await fetch(`${this.baseUrl}/api/products/${id}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const data = await response.json();
      return data.success ? data.product : null;
    } catch (error) {
      console.error('Get product error:', error);
      return null;
    }
  }

  // Order methods
  async createOrder(orderData: Partial<Order>): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      const token = this.getCurrentToken();
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }

      const response = await fetch(`${this.baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, order: data.order };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Create order error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const token = this.getCurrentToken();
      if (!token) {
        console.log('No token found for getOrders');
        return [];
      }

      console.log('Fetching user orders from:', `${this.baseUrl}/api/orders/my-orders`);
      const response = await fetch(`${this.baseUrl}/api/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Orders response status:', response.status);
      const data = await response.json();
      console.log('Orders response data:', data);
      
      return data.success ? data.orders : [];
    } catch (error) {
      console.error('Get orders error:', error);
      return [];
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const token = this.getCurrentToken();
      if (!token) {
        console.log('No token found for getAllOrders');
        return [];
      }

      console.log('Fetching all orders from:', `${this.baseUrl}/api/orders`);
      const response = await fetch(`${this.baseUrl}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('All orders response status:', response.status);
      const data = await response.json();
      console.log('All orders response data:', data);
      
      return data.success ? data.orders : [];
    } catch (error) {
      console.error('Get all orders error:', error);
      return [];
    }
  }

  async getOrder(id: string): Promise<Order | null> {
    try {
      const token = this.getCurrentToken();
      if (!token) return null;

      const response = await fetch(`${this.baseUrl}/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data.success ? data.order : null;
    } catch (error) {
      console.error('Get order error:', error);
      return null;
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      const token = this.getCurrentToken();
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }

      console.log('🔧 Updating order status:', { orderId, status, token: token.substring(0, 20) + '...' });

      const response = await fetch(`${this.baseUrl}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      console.log('📡 Status update response:', response.status, response.statusText);

      const data = await response.json();
      console.log('📄 Response data:', data);

      if (data.success) {
        return { success: true, order: data.order };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Update order status error:', error);
      return { success: false, error: 'Network error' };
    }
  }
}

export default new MongoDBService(); 