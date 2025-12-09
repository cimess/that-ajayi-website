import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CollectionItem, BrandSubmission, ClientBooking } from '../types';
import { COLLECTIONS as INITIAL_COLLECTIONS } from '../constants';

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
  addSubmission: (submission: BrandSubmission | FormData) => void;
  updateSubmissionStatus: (id: string, status: BrandSubmission['status']) => void;
  addBooking: (booking: ClientBooking) => void;
  updateBookingStatus: (id: string, status: ClientBooking['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
const API_URL = 'http://localhost:4000/api';

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
        const res = await fetch(`${API_URL}/collections`);
        if (res.ok) {
          const data = await res.json();
          const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
          setCollections(prev => [
            ...prev,
            ...mappedData.filter((item: any) => !prev.some(prevItem => prevItem.id === item.id))
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch collections:", err);
      }
    };

    fetchCollections();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setIsLoadingAuth(false);
        return true;
      }
    } catch (err) {
      console.error("Auth check failed", err);
    }
    setIsAuthenticated(false);
    setIsLoadingAuth(false);
    return false;
  };

  const login = async (credentials: any) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (res.ok) {
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      console.error("Login failed", err);
    }
    return false;
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
      setIsAuthenticated(false);
      setSubmissions([]);
      setBookings([]);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const fetchAdminData = async () => {
    try {
      const [subRes, bookRes] = await Promise.all([
        fetch(`${API_URL}/submissions`),
        fetch(`${API_URL}/bookings`)
      ]);

      if (subRes.ok) {
        const subs = await subRes.json();
        setSubmissions(subs.map((s: any) => ({ ...s, id: s._id })));
      }
      if (bookRes.ok) {
        const books = await bookRes.json();
        setBookings(books.map((b: any) => ({ ...b, id: b._id })));
      }
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    }
  };

  const addCollectionItem = async (formData: FormData) => {
    try {
      const res = await fetch(`${API_URL}/collections`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const newItem = await res.json();
        setCollections(prev => [{ ...newItem, id: newItem._id }, ...prev]);
      }
    } catch (err) {
      console.error("Error uploading collection:", err);
    }
  };

  const deleteCollectionItem = async (id: string | number) => {
    try {
      if (typeof id === 'string') await fetch(`${API_URL}/collections/${id}`, { method: 'DELETE' });
      setCollections(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting collection:", err);
    }
  };

  const addSubmission = async (submissionData: FormData | BrandSubmission) => {
    try {
      // Determine if we are sending JSON or FormData
      // Ideally we standardize on FormData for submissions with files

      let options: RequestInit = {
        method: 'POST',
      };

      if (submissionData instanceof FormData) {
          options.body = submissionData;
          // Content-Type header is set automatically by browser for FormData
      } else {
          // Fallback if called with object (legacy)
          options.headers = { 'Content-Type': 'application/json' };
          options.body = JSON.stringify({
            brandName: submissionData.brandName,
            contactEmail: submissionData.contactEmail,
            description: submissionData.description
          });
      }

      await fetch(`${API_URL}/submissions`, options);
    } catch (err) {
      console.error("Failed to add submission", err);
    }
  };

  const updateSubmissionStatus = async (id: string, status: BrandSubmission['status']) => {
    try {
      await fetch(`${API_URL}/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setSubmissions(prev => prev.map(sub => (sub.id === id ? { ...sub, status } : sub)));
    } catch (err) {
      console.error("Failed to update submission", err);
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
      await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Failed to add booking", err);
    }
  };

  const updateBookingStatus = async (id: string, status: ClientBooking['status']) => {
    try {
      await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error("Failed to update booking", err);
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
