import { AppBar, Toolbar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        {user?.role === "user" && (
          <>
            <Button color="inherit" onClick={() => nav("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => nav("/search")}>
              Search
            </Button>
          </>
        )}

        {/* Admin link */}
        {user?.role === "admin" && (
          <Button color="inherit" onClick={() => nav("/admin")}>
            Manage Movies
          </Button>
        )}

        <div style={{ flexGrow: 1 }} />

        {/* Auth buttons */}
        {!user ? (
          <Button color="inherit" onClick={() => nav("/auth")}>
            Login / Register
          </Button>
        ) : (
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
