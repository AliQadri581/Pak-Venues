import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/profile');
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false); // Even on error, set isLoading to false
      }
    };

    fetchUser(); // Fetch user data on mount
  console.log('context', user)
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Render children when not loading */}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
