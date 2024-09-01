import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Homepage from "./Pages/Homepage";
import UnauthorizedPage from './Pages/UnauthorizedPage'; 
import { AuthProvider } from './Context/AuthProvider';
import NotFoundPage from './Pages/NotFoundPage';
import Users from './Pages/Users';
import Roles from './Pages/Roles';
import Authors from './Pages/Authors';

function App() {
  return (
    // <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/"
            element={<ProtectedRoute element={<Homepage />} requiredRole="permission"/> }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    // </AuthProvider>
  );
}

export default App;
