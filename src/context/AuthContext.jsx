"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export const AuthContext = createContext({
  user: null,
  isLoggingIn: false,
  login: async () => {},
  logout: () => {},
  authCheck: async () => {},
  updateUser: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [token, setToken] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const router = useRouter();

  const login = async (userForm) => {
    setIsLoggingIn(true);
    try {
      const response = await axios.post(`/api/login`, {
        userForm,
      });

      if (response.status === 200 && response.data.user) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setToken(response.data.token);
        toast.success("Logged in successfully");
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/home");
  };

  const authCheck = async () => {
    try {
      const res = await axios.get("/api/get-me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };
  const updateUser = async (data) => {
    try {
      const res = await axios.put(
        "/api/user",
        { data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("User info updated successfully");
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      authCheck();
    } else {
      setToken(localStorage.getItem("token"));
    }
  }, [token, refetch]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggingIn,
        login,
        logout,
        authCheck,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
