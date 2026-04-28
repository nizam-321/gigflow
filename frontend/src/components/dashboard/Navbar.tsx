import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store";
import {ModeToggle} from "@/components/mode-toggle.tsx"

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg">
          <div className="h-8 w-8 rounded bg-primary text-primary-foreground flex items-center justify-center">
            GF
          </div>
          <span className="gradient-text font-bold">GigFlow</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/browsegigs")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Browse Gigs
          </button>

          <Button
            onClick={() => navigate("/postgig")}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            + Post Gig
          </Button>

          {/* <button className="text-sm text-muted-foreground hover:text-primary transition-colors"> */}
            <ModeToggle/>
          {/* </button> */}

          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
