import { Link } from "react-router-dom";
import logo from "../../assets/logo150-1.png";
import "./Header.css";
import { useState } from "react";

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <>
      <header>
        <nav
          className={`navbar
         ${showLinks ? "show-nav" : "hide-nav"}`}
        >
          <div className="navbar__logo">
            <Link to="/">
              <img src={logo} alt="Eco-co Challenge" />
            </Link>
          </div>

          <ul className="navbar__links">
            <li className="navbar__item slideInDown-1">
              <Link to="/home">Home</Link>
            </li>

            <li className="navbar__item slideInDown-2">
              <Link to="/friends">Mes Amis</Link>
            </li>

            <li className="navbar__item slideInDown-3">
              <Link to="/login">Logout</Link>
            </li>
          </ul>

          <button className="navbar__burger" onClick={handleShowLinks}>
            <span className="burger-bar"></span>
          </button>
        </nav>
      </header>
    </>
  );
}
