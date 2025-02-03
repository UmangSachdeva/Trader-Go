import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login/Login";
import TopBar from "./components/common/TopBar";
import { Toaster } from "./components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Stock from "./pages/Stock/Stock";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useEffect } from "react";
import { useGetUserDetails } from "./api/auth/quries";
import Dashboard from "./pages/Dashboard/Dashboard";

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !localStorage.getItem("access_token") &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    } else if (
      localStorage.getItem("access_token") &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate("/"); // Redirect to main page if already logged in
    }
  }, [location.pathname, localStorage.getItem("access_token")]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TopBar />
        <Routes>
          <Route
            path="/login"
            element={
              !localStorage.getItem("access_token") ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/* <Route
            path="/signup"
            element={
              !localStorage.getItem("access_token") ? (
                <Signup />
              ) : (
                <Navigate to="/" replace />
              )
            }
          /> */}
          <Route
            path="/stock/:tracker"
            element={
              <ProtectedRoute>
                <Stock />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {/* Main page content here */}
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
