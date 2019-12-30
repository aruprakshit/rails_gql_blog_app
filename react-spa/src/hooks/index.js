import { useState, useEffect } from 'react';

export function useSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('isAuthenticated')) ?? false
  );

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', true);
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }, [isAuthenticated]);

  const authenticate = () => {
    setIsAuthenticated(true);
  };

  const logOut = cb => {
    setIsAuthenticated(false);
    cb();
  };

  return { isAuthenticated, authenticate, logOut };
}
