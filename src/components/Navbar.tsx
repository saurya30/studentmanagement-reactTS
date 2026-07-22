import { Link, NavLink, useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/login');
   }

  return (
    <nav className="navbar">
      <div className="navbar-index">
        <NavLink to="/" className={({isActive}) => isActive ? "navbar-active" : ""} >Home</NavLink>
        <NavLink to="/add-student" className={({isActive}) => isActive ? "navbar-active" : ""}>Add Student</NavLink>
      </div>
      <div className="navbar-sign">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
