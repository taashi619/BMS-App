import React, { createContext, useContext, useState } from "react";
import api from "../api/axios"; 

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email, role }
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
  console.log("LOGIN CALLED with", email); // debug
  setLoading(true);
  try {
    const res = await api.post("/auth/login", { email, password });
    console.log("LOGIN RESPONSE:", res.data); // debug

    const { token: jwt, role: userRole } = res.data;

    setToken(jwt);
    setRole(userRole);
    const profileRes = await api.get("/profile", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const profile = profileRes.data.profile;
    setUser(profile);

    return { success: true, role: userRole };
  } catch (err) {
    console.log("LOGIN ERROR message:", err.message); // debug
    console.log("LOGIN ERROR response:", err.response?.data); // debug
    const msg =
      err?.response?.data?.message || "Login failed, please try again";
    return { success: false, message: msg };
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    // TODO: clear persisted token later
  };

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
