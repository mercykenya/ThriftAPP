// PrivateRoute.js

import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  return localStorage.getItem("auth") 
    ? children
    : <Navigate to="/login" />;
}

export default PrivateRoute;