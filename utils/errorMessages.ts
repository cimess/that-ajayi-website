// User-friendly error messages
export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',

  // Authentication errors
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',

  // Validation errors
  VALIDATION_ERROR: 'Please check your input and try again.',
  MISSING_FIELDS: 'Please fill in all required fields.',
  INVALID_EMAIL: 'Please enter a valid email address.',

  // Resource errors
  NOT_FOUND: 'The requested resource was not found.',
  ALREADY_EXISTS: 'This resource already exists.',

  // Server errors
  SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
  SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later.',

  // Upload errors
  UPLOAD_FAILED: 'Failed to upload file. Please try again.',
  FILE_TOO_LARGE: 'File is too large. Maximum size is 50MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload an image or video.',

  // Generic
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

export const getErrorMessage = (error: any): string => {
  // Network errors
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return ERROR_MESSAGES.TIMEOUT_ERROR;
    }
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // HTTP status errors
  const status = error.response?.status;
  const message = error.response?.data?.message;

  switch (status) {
    case 400:
      return message || ERROR_MESSAGES.VALIDATION_ERROR;
    case 401:
      return message || ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 409:
      return ERROR_MESSAGES.ALREADY_EXISTS;
    case 500:
      return ERROR_MESSAGES.SERVER_ERROR;
    case 503:
      return ERROR_MESSAGES.SERVICE_UNAVAILABLE;
    default:
      return message || ERROR_MESSAGES.UNKNOWN_ERROR;
  }
};
