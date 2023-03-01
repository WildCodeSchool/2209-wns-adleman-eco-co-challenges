import { Link } from "react-router-dom";
import logo from "../assets/logo300-1.png";
import bananaRight from "../assets/bananar.png";
import bananaLeft from "../assets/bananal.png";

export default function Landing() {
  const citation = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const citationAvecBananes = citation.replace(/"/g, bananaLeft);
  // Utilisation de l'expression régulière /"/g pour remplacer toutes les guillemets
  // par des bananes (🍌)

  return (
    <div className="landing cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <div className="landing__logo">
        <img src={logo} alt="Eco-co Challenge" />
      </div>
      <p className="landing__line"></p><hr
   style={{
   background: "#6F38C5",
   height: "5px",
   border: "none",
   zIndex: 9,
   }}
/>

      <div className="landing__container">
        <h4 className="landing__title">Welcome sur les éco-co Challenges</h4>
        <p>
          <img src={bananaRight} alt="guillemets bananes" />
          <p className="landing__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            egestas commodo lorem varius rutrum. Duis accumsan sapien nisl, et
            finibus nunc viverra et. Pellentesque commodo accumsan erat,
            vehicula tempor arcu cursus et. Phasellus in molestie sapien, nec
            aliquam dui. Ut pretium nulla imperdiet ligula vehicula posuere.
            Morbi pharetra diam sit amet tempor eleifend. Curabitur interdum
            risus a imperdiet tempus. Nam aliquam ante ex, efficitur bibendum
            diam gravida eget. Ut sed iaculis urna. Aenean eu mi nec elit
            vestibulum congue. Duis non lacus vitae nisi lobortis semper vel
            mattis ligula.
          </p>
          <div>{citationAvecBananes}</div>
        </p>
        <img src={bananaLeft} alt="guillemets bananes" />
      </div>
      <Link to="/login">
        <button className="landing__button"> Let's go Coco !</button>
      </Link>
    </div>
  );
}
