import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/events";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
