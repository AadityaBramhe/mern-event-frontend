import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../App.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registered successfully");
      window.location.href = "/login";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <p>
        Already have an account? <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}
