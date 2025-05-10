import React, { createContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  name: string;
  phone: string;
  address: string;
  circleCode: string;
  joinDate: string;
  monthlyYanat: number;
  totalYanat: number;
  isAdmin: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (phone: string, password: string, circleCode: string) => Promise<void>;
  signOut: () => void;
  register: (name: string, phone: string, address: string, password: string, circleCode: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for stored credentials
    const checkAuth = async () => {
      try {
        // In a real app, this would check for stored tokens or credentials
        setIsLoading(true);
        
        // For demo purposes, simulate an automatic login for testing
        setTimeout(() => {
          // Comment out this line to start with logged out state
          // setUser(getMockUser());
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const getMockUser = (): User => ({
    id: 1,
    name: 'আব্দুল্লাহ আল মামুন',
    phone: '01712345678',
    address: 'মধুপুর, টাঙ্গাইল',
    circleCode: 'MDPR2025',
    joinDate: '১২ জানুয়ারি, ২০২৩',
    monthlyYanat: 500,
    totalYanat: 8000,
    isAdmin: true,
  });

  const signIn = async (phone: string, password: string, circleCode: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would make an API request to authenticate
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just set a mock user
      setUser(getMockUser());
    } catch (error) {
      throw new Error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const register = async (name: string, phone: string, address: string, password: string, circleCode: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would make an API request to register
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just set a mock user
      setUser({
        id: 2,
        name,
        phone,
        address,
        circleCode,
        joinDate: '৫ জুন, ২০২৫',
        monthlyYanat: 500,
        totalYanat: 0,
        isAdmin: false,
      });
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isSignedIn: !!user, 
        signIn, 
        signOut, 
        register 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};