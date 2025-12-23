import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import ManageMovies from "./pages/ManageMovies";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Search from "./pages/Search";

export default function App() {
  const { user } = useSelector((s) => s.auth);

  return (
    <BrowserRouter>
      {/* Header only AFTER login */}
      {user && <Header />}

      <Routes>
        {/* Default route → AUTH */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Home />
              )
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* AUTH PAGE */}
        <Route path="/auth" element={<AuthPage />} />

        {/* USER HOME */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

<Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search/>
            </ProtectedRoute>
          }
        />

        {/* ADMIN PAGE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute admin>
              <ManageMovies />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
