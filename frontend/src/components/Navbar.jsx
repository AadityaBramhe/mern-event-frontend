import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Eventify</h2>
      <div>
        <Link to="/events">Events</Link>
        <Link to="/create">Create</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
