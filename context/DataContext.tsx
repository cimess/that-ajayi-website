import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CollectionItem, BrandSubmission, ClientBooking } from '../types';
import { COLLECTIONS as INITIAL_COLLECTIONS } from '../constants';
import apiClient from '../services/apiClient';
import { API_ENDPOINTS } from '../config/api.config';

interface DataContextType {
  collections: CollectionItem[];
  submissions: BrandSubmission[];
  bookings: ClientBooking[];
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  login: (credentials: any) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchAdminData: () => Promise<void>;
  addCollectionItem: (formData: FormData) => Promise<void>;
  deleteCollectionItem: (id: string | number) => Promise<void>;
  addSubmission: (submission: BrandSubmission | FormData) => Promise<void>;
  updateSubmissionStatus: (id: string, status: BrandSubmission['status']) => Promise<void>;
  addBooking: (booking: ClientBooking) => Promise<void>;
  updateBookingStatus: (id: string, status: ClientBooking['status']) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [collections, setCollections] = useState<CollectionItem[]>(INITIAL_COLLECTIONS);
  const [submissions, setSubmissions] = useState<BrandSubmission[]>([]);
  const [bookings, setBookings] = useState<ClientBooking[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await apiClient.get<any[]>(API_ENDPOINTS.COLLECTIONS.BASE);
        const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
        setCollections(prev => [
          ...prev,
          ...mappedData.filter((item: any) => !prev.some(prevItem => prevItem.id === item.id))
        ]);
      } catch (err) {
        console.error("Failed to fetch collections:", apiClient.getErrorMessage(err));
      }
    };

    fetchCollections();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
      return true;
    } catch (err) {
      console.error("Auth check failed", err);
      setIsAuthenticated(false);
      setIsLoadingAuth(false);
      return false;
    }
  };

  const login = async (credentials: any) => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      setIsAuthenticated(true);
      setIsLoadingAuth(false); // Ensure loading state is cleared
      return true;
    } catch (err) {
      console.error("Login failed", apiClient.getErrorMessage(err));
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      setIsAuthenticated(false);
      setSubmissions([]);
      setBookings([]);
    } catch (err) {
      console.error("Logout failed", apiClient.getErrorMessage(err));
    }
  };

  const fetchAdminData = useCallback(async () => {
    try {
      const [subs, books] = await Promise.all([
        apiClient.get<any[]>(API_ENDPOINTS.SUBMISSIONS.BASE),
        apiClient.get<any[]>(API_ENDPOINTS.BOOKINGS.BASE)
      ]);

      setSubmissions(subs.map((s: any) => ({ ...s, id: s._id })));
      setBookings(books.map((b: any) => ({ ...b, id: b._id })));
    } catch (err) {
      console.error("Failed to fetch admin data", apiClient.getErrorMessage(err));
    }
  }, []);

  const addCollectionItem = async (formData: FormData) => {
    try {
      const newItem = await apiClient.upload<any>(API_ENDPOINTS.COLLECTIONS.BASE, formData);
      setCollections(prev => [{ ...newItem, id: newItem._id }, ...prev]);
    } catch (err) {
      console.error("Error uploading collection:", apiClient.getErrorMessage(err));
      throw err;
    }
  };

  const deleteCollectionItem = async (id: string | number) => {
    try {
      if (typeof id === 'string') {
        await apiClient.delete(API_ENDPOINTS.COLLECTIONS.BY_ID(id));
      }
      setCollections(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting collection:", apiClient.getErrorMessage(err));
      throw err;
    }
  };

  const addSubmission = async (submissionData: FormData | BrandSubmission) => {
    try {
      if (submissionData instanceof FormData) {
        await apiClient.upload(API_ENDPOINTS.SUBMISSIONS.BASE, submissionData);
      } else {
        await apiClient.post(API_ENDPOINTS.SUBMISSIONS.BASE, {
          brandName: submissionData.brandName,
          contactEmail: submissionData.contactEmail,
          description: submissionData.description
        });
      }
    } catch (err) {
      console.error("Failed to add submission", apiClient.getErrorMessage(err));
      throw err;
    }
  };

  const updateSubmissionStatus = async (id: string, status: BrandSubmission['status']) => {
    try {
      await apiClient.patch(API_ENDPOINTS.SUBMISSIONS.BY_ID(id), { status });
      setSubmissions(prev => prev.map(sub => (sub.id === id ? { ...sub, status } : sub)));
    } catch (err) {
      console.error("Failed to update submission", apiClient.getErrorMessage(err));
      throw err;
    }
  };

  const addBooking = async (booking: ClientBooking) => {
    try {
      const payload = {
        clientName: booking.clientName,
        email: booking.email,
        eventType: booking.eventType,
        date: booking.date,
        budget: booking.budget
      };
      await apiClient.post(API_ENDPOINTS.BOOKINGS.BASE, payload);
    } catch (err) {
      console.error("Failed to add booking", apiClient.getErrorMessage(err));
      throw err;
    }
  };

  const updateBookingStatus = async (id: string, status: ClientBooking['status']) => {
    try {
      await apiClient.patch(API_ENDPOINTS.BOOKINGS.BY_ID(id), { status });
      setBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error("Failed to update booking", apiClient.getErrorMessage(err));
      throw err;
    }
  };

  return (
    <DataContext.Provider
      value={{
        collections,
        submissions,
        bookings,
        isAuthenticated,
        isLoadingAuth,
        login,
        logout,
        fetchAdminData,
        addCollectionItem,
        deleteCollectionItem,
        addSubmission,
        updateSubmissionStatus,
        addBooking,
        updateBookingStatus
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
