import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState("loading"); // "loading" | "admin" | "unauthorized"

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token"); // Must match the key used in AdminLogin.jsx

      if (!token) {
        setAuthState("unauthorized");
        return;
      }

      try {
        const res = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        //  Log this during debugging to confirm the actual shape
        console.log("Auth response:", res.data);

        const role = res.data?.admin?.role;

        if (res.data.success && role === "admin") {
          setAuthState("admin");
        } else {
          localStorage.removeItem("token");
          setAuthState("unauthorized");
        }
      } catch (err) {
        console.error("Auth check failed:", err.response?.data || err.message);
        setAuthState("unauthorized");
      }
    };

    checkAdmin();
  }, []);

  if (authState === "loading") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Verifying access...</p>
      </div>
    );
  }

  if (authState === "unauthorized") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
