'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const  Protected = (WrappedComponent)=> {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(isLoggedIn);

      if (!isLoggedIn) {
        router.push(`/login?redirect=${window.location.pathname}`);
      }
    }, []);

    if (isAuthenticated === null) {
      return null; 
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default Protected