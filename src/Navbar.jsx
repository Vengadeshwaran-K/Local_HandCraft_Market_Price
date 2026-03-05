import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">LocalMart</h2>

      <ul className="nav-links">
        <li><Link to="/">Login</Link></li>
        <li><Link to="/users">User</Link></li>
        <li><Link to="/products">Product</Link></li>
        <li><Link to="/orders">Order</Link></li>
      </ul>

    </nav>
  );
}

export default Navbar;