import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard, LogIn, UserPlus, Sparkles, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store";
import {ModeToggle} from "@/components/mode-toggle.tsx"

interface Props {
  isAuthenticated: boolean;
}

export default function BrowseNavbar({ isAuthenticated }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/gigs" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Sparkles className="text-primary-foreground font-bold text-lg" />
            </div>
            <span className="text-2xl font-extrabold gradient-text">GigFlow</span>
          </Link>

          <nav className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    variant="ghost" 
                    className="hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/postgig">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md btn-hover-lift">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Gig
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="hover:bg-destructive/10 hover:text-destructive transition-all"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <ModeToggle/>
                <Link to="/login">
                  <Button 
                    variant="ghost"
                    className="hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md btn-hover-lift">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
