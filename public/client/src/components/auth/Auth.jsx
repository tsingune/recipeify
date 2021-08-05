import { useState, useEffect } from 'react';

import RecipeifyAPI from '../../api/RecipeifyAPI';

export const useAuth = () => {
  const [isSignedIn, setisSignedin] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('token');

      if (!token) {
        setisSignedin(false);
        return;
      }

      // Axios config
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await RecipeifyAPI.get('/users/isSignedIn', config);

        setisSignedin(true);
        setUser(res.data.data.user);
      } catch (err) {
        console.log(err.response);
        setisSignedin(false);
      }
    }

    checkAuth();
  }, []);

  return [user, isSignedIn];
};

export default useAuth;
