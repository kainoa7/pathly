import { create } from 'zustand';
import { track } from '../lib/analytics';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: 'EXPLORER' | 'PRO' | 'PREMIUM';
  university?: string;
  graduationYear?: string;
  major?: string;
  interests: string[];
  goals?: string;
  onboardingComplete: boolean;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchUser: () => Promise<void>;
  updateProfile: (profileData: {
    major?: string;
    interests?: string[];
    goals?: string;
    graduationYear?: number;
    onboardingComplete?: boolean;
  }) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => {
    const currentUser = get().user;
    
    // Track upgrade if user went from EXPLORER to PRO/PREMIUM
    if (user && currentUser && 
        currentUser.accountType === 'EXPLORER' && 
        (user.accountType === 'PRO' || user.accountType === 'PREMIUM')) {
      track('Upgraded', { plan: user.accountType });
    }
    
    set({ user });
  },
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),

  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });

      const token = localStorage.getItem('accessToken');
      if (!token) {
        set({ user: null, isLoading: false });
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('accessToken');
          set({ user: null, isLoading: false });
          return;
        }
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }

      const data = await response.json();
      set({ user: data.user, isLoading: false });
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch user',
        isLoading: false 
      });
    }
  },

  updateProfile: async (profileData) => {
    try {
      set({ isLoading: true, error: null });

      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update profile: ${response.statusText}`);
      }

      const data = await response.json();
      set({ user: data.user, isLoading: false });
    } catch (error) {
      console.error('Error updating profile:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update profile',
        isLoading: false 
      });
      throw error; // Re-throw so the component can handle it
    }
  },
}));