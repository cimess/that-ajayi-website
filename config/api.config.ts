// API Configuration
export const API_CONFIG = {
  BASE_URL: (import.meta.env.VITE_API_URL as string) || 'https://that-ajayi-website.onrender.com/api',
  ENABLE_EMAIL: (import.meta.env.VITE_ENABLE_EMAIL as string) === 'true',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  // Collections
  COLLECTIONS: {
    BASE: '/collections',
    BY_ID: (id: string) => `/collections/${id}`,
  },
  // Submissions
  SUBMISSIONS: {
    BASE: '/submissions',
    BY_ID: (id: string) => `/submissions/${id}`,
  },
  // Bookings
  BOOKINGS: {
    BASE: '/bookings',
    BY_ID: (id: string) => `/bookings/${id}`,
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
