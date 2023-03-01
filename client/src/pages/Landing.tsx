import { Link } from "react-router-dom";
import logo from "../assets/logo300-1.png";
import team from "../assets/landing-pic.png";
import bananaRight from "../assets/bananas-l.png";
import bananaLeft from "../assets/bananas-r.png";
import Footer from "../components/Footer/Footer";

export default function Landing() {
  return (
    <>
      <div className="landing cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <div className="landing__logo">
          <img src={logo} alt="Eco-co Challenge" />
        </div>
        <p className="landing__line"></p>
        <div className="landing__container">
          <p className="landing__paragraph">
            <img src={bananaRight} alt="guillemets bananes" />
          </p>
          <p className="landing__text landing__paragraph">
            Nulla facilisis magna quis porftitor tincidunt. Sed gravida, turpis
            nec pharetra bibendum, massa dui placerat lectus, sed elementum
            nulla arcu vel elit. Integer leo mauris.Vivamus eget malesuada felis. Nullam vel mi nec ex maximus
            condimentum a at dui. Pellentesque commodo sollicitudin faucibus.
            <p className="landing__paragraph">
              <img src={bananaLeft} alt="guillemets bananes" />
            </p>
          </p>
        </div>
        <Link to="/login">
          <button className="landing__button"> Let's go Coco !</button>
        </Link>
        <div className="landing__content container">
          <div className="landing__content__article">
           <h3 className="landing__content__title"> <u>Lorem ipsum</u> dolor sit amet !</h3>
            <p className="landing__content__text">
            Phasellus maximus volutpat lacus vel pharetra. Mauris ut mi et leo
            commodo scelerisque. Nunc eget gravida leo, vel dignissim lectus.
            Vivamus eget malesuada felis. Nullam vel mi nec ex maximus
            condimentum a at dui. Pellentesque commodo sollicitudin faucibus.
           </p>
           <Link to="/login">
              <button className="landing__content__button"> Let's go Coco !</button>
            </Link>
          </div>
           <img src={team} alt="équipe Eco-co challenges" className="landing__content__image"/>
        </div>

        <div className="landing__content__right container">
          <img src={team} alt="équipe Eco-co challenges" className="landing__content__image"/>

          <div className="landing__content__article__right">
           <h3 className="landing__content__title__right"> <u>Lorem ipsum</u> dolor sit amet !</h3>
            <p className="landing__content__text__right">
            Phasellus maximus volutpat lacus vel pharetra. Mauris ut mi et leo
            commodo scelerisque. Nunc eget gravida leo, vel dignissim lectus.
            Vivamus eget malesuada felis. Nullam vel mi nec ex maximus
            condimentum a at dui. Pellentesque commodo sollicitudin faucibus.
           </p>
           <Link to="/login">
              <button className="landing__content__button__right"> Let's go Coco !</button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
