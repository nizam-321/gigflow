import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Jab auth state load ho rahi ho (optional)
  if (loading) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  // Agar user login nahi hai → login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar login hai → dashboard show
  return <>{children}</>;
}
