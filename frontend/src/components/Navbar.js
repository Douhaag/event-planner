import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-container">
      <Link to="/" className="navbar-brand">EventPlanner</Link>
      <div className="navbar-links">
        <Link to="/" className="nav-item">
          <span className="icon">🗓️</span> Events
        </Link>
        <Link to="/add" className="nav-item">
          <span className="icon">➕</span> Add Event
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;