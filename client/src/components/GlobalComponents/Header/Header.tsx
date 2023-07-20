import "./Header.css";

import { useGetProfileQuery, useLogoutMutation } from "../../../gql/generated/schema";

import { Link } from "react-router-dom";
import logo from "../../../assets/logo150-1.png";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const [logout] = useLogoutMutation();

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const { data: currentUser, client} = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const currentUserId = currentUser?.profile.id;

  const handleLogout = async () => {
    await logout();
    toast.success("Vous êtes déconnecté !", {
      duration: 5000,
    });
    await client.resetStore();
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
              <Link to={`/user/${currentUserId}`}>Home</Link>
            </li>

            <li className="navbar__item slideInDown-2">
              <Link to={`/user/${currentUserId}/update`}>Mon profil</Link>
            </li>

            <li className="navbar__item slideInDown-3">
              <Link to="/friends">Mes Amis</Link>
            </li>

            <li className="navbar__item slideInDown-4">
              <Link to="/login" onClick={handleLogout}>Logout</Link>
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
