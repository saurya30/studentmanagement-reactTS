import { NavLink, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/themeContext";
import { Button } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();

  const { mode, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-index">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "navbar-active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/add-student"
          className={({ isActive }) => (isActive ? "navbar-active" : "")}
        >
          Add Student
        </NavLink>
      </div>
      <div className="navbar-sign">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <Button variant="outlined" onClick={toggleTheme}>
          {mode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
