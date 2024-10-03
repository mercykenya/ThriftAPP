import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref as getDbRef, get } from 'firebase/database';

import SignUp from './Components/SignUpPage';

import Homepage from './Components/Homepage';
import ProfilePage from './Components/ProfilePage';
import { auth, database } from './firebase';
import SignIn from './Components/SignInPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const auth = getAuth();

  // steven: maybe move "checkAuth" and "fetchData" function declaratoins 
  // outside of the useEffect so that fetchData can be exported when we need to refresh the page
  // sometimes (ProfilePage.jsx)
  const checkAuthentication = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    });
  };

  const fetchData = async () => {
    try {
      const dbRef = getDbRef(database);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        setProducts(snapshot.val()['products']);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuthentication();
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage Route */}
        <Route path="/home" element={<Homepage products={products} />} /> 

        {/* SignInPage Route */}
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        {/* ProfilePage Route */}
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <ProfilePage
                products={products}
                updateData={fetchData}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
