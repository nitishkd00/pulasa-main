// MongoDB Configuration for Pulasa.com
// This file contains API configuration for the unified auth service

export const MONGODB_CONFIG = {
  uri: import.meta.env.VITE_MONGODB_URI || 'mongodb+srv://nitishkumardevoju:muwLYrPn5blRAGCd@pulasa.sjvscku.mongodb.net/?retryWrites=true&w=majority&appName=pulasa'
};

export const API_CONFIG = {
  baseUrl: 'https://api.pulasa.com',
  authService: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    profile: '/api/auth/profile',
    logout: '/api/auth/logout',
    validate: '/api/auth/validate'
  }
};

// MongoDB connection configuration
export const getMongoDBConfig = () => ({
  uri: MONGODB_CONFIG.uri,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
});

// API endpoints configuration
export const getAPIEndpoints = () => ({
  auth: {
    login: `${API_CONFIG.baseUrl}${API_CONFIG.authService.login}`,
    register: `${API_CONFIG.baseUrl}${API_CONFIG.authService.register}`,
    profile: `${API_CONFIG.baseUrl}${API_CONFIG.authService.profile}`,
    logout: `${API_CONFIG.baseUrl}${API_CONFIG.authService.logout}`,
    validate: `${API_CONFIG.baseUrl}${API_CONFIG.authService.validate}`
  }
}); 