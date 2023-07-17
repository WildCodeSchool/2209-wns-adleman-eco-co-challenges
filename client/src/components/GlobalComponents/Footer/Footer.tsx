import { Link } from "react-router-dom";
import logo from "../../../assets/logo150-1.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wave" id="wave"></div>
      <ul className="menu">
        <li className="menu__item">
          <Link to="/">
            <img src={logo} alt="Eco-co Challenge" />
          </Link>
        </li>
        <li className="menu__item">
          <Link to="/login">Participez !</Link>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Entreprises
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Contact
          </a>
        </li>
      </ul>
      <p>&copy;2023 Eco-co Challenges | All Rights Reserved</p>
    </footer>
  );
}
