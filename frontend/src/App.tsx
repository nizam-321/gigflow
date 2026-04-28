//path: frontend/src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { checkAuth } from "./store/slices/authSlice";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import BrowseGigs from "./pages/BrowseGigs";
import PostGig from "./pages/PostGig";
import GigDetails from "./pages/GigDetails";


function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/browsegigs" element={<BrowseGigs />} />
      <Route path="/postgig" element={<ProtectedRoute><PostGig /></ProtectedRoute>} />
      <Route path="/gigs/:id" element={<GigDetails />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/browsegigs" />} />
    </Routes>
  );
}

export default App;
