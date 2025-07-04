
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function HeaderNavigation() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLoginClick = () => {
    console.log("Login button clicked, navigating to /login");
    navigate("/login");
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked, navigating to /register");
    navigate("/register");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <span className="text-sm text-muted-foreground">
            Welcome, {user.email}
          </span>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleLoginClick} variant="outline" size="sm">
            Login
          </Button>
          <Button onClick={handleRegisterClick} variant="default" size="sm">
            Register
          </Button>
        </>
      )}
    </div>
  );
}
