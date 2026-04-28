//path: frontend/src/pages/Login.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authStart, authSuccess, authFailure } from "@/store/slices/authSlice";
import { loginUser } from "@/services/authApi";
import type { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Sparkles, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(authStart());

      const data = await loginUser({ email, password });

      // backend response: { message, user }
      dispatch(authSuccess(data.user));
      navigate("/dashboard");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      dispatch(
        authFailure(
          error.response?.data?.message || "Login failed. Try again."
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-4 py-8">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl float" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-2 border-primary/10 backdrop-blur-sm bg-card/95 scale-in relative z-10">
        <CardHeader className="flex flex-col items-center space-y-3 pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg glow mb-2">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <CardTitle className="text-3xl font-bold gradient-text">
            Welcome Back
          </CardTitle>

          <p className="text-sm text-muted-foreground text-center">
            Sign in to continue your freelance journey
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2 fade-in-delay-1">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 border-2 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 fade-in-delay-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 border-2 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-destructive/10 border-2 border-destructive/50 text-destructive p-3 rounded-lg text-sm font-medium scale-in">
                {error}
              </div>
            )}

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold shadow-lg btn-hover-lift fade-in-delay-3"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full spinner"></div>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative fade-in-delay-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm text-center text-muted-foreground fade-in-delay-3">
            Don&apos;t have an account?{" "}
            <span 
              onClick={() => navigate("/signup")}
              className="text-primary font-semibold hover:underline cursor-pointer transition-all hover:text-accent">
              Create one now
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
