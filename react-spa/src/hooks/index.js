import { useState, useEffect } from 'react';

export function useSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') ?? false
  );

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', true);
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }, [isAuthenticated]);

  console.log('useSession', isAuthenticated);

  const authenticate = () => {
    setIsAuthenticated(true);
  };

  const logOut = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, authenticate, logOut };
}
