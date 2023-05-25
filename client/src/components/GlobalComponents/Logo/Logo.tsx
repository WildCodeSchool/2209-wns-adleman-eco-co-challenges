import "./Logo.css";
import logo from "./logo.png";

function Logo() {
  return (
    <div className="Logo">
      <img src={logo} alt="Logo" id="EcoLogo" />
    </div>
  );
}

export default Logo;
