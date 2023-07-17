import Footer from "../components/GlobalComponents/Footer/Footer";
import { Link } from "react-router-dom";
import bananaLeft from "../assets/bananas-r.png";
import bananaRight from "../assets/bananas-l.png";
import logo from "../assets/logo300-1.png";
import team from "../assets/landing-pic.png";

export default function Landing() {
  return (
    <>
      <div className="landing cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
     
        <p className="landing__top">
        <div className="landing__logo">
          <img src={logo} alt="Eco-co Challenge" />
        </div>
        </p>
        <div className="landing__container fs-5 col-md-6">
          <p className="landing__paragraph">
            <img src={bananaRight} alt="guillemets bananes" />
          </p>
          <p className="landing__text landing__paragraph">
            Nulla facilisis magna quis porftitor tincidunt. Sed gravida, turpis
            nec pharetra bibendum, massa dui placerat lectus, sed elementum
            nulla arcu vel elit. Integer leo mauris.Vivamus eget malesuada
            felis. Nullam vel mi nec ex maximus condimentum a at dui.
            Pellentesque commodo sollicitudin faucibus.
            <p className="landing__paragraph">
              <img src={bananaLeft} alt="guillemets bananes" />
            </p>
          </p>
        </div>
        <Link to="/login">
          <button className="ecoco-button"> Let's go Coco !</button>
        </Link>

        <div className="container col-xxl-10 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={team}
                alt="équipe Eco-co challenges"
                className="d-block mx-lg-auto img-fluid landing__content__image"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="display-5 lh-2 mb-3 landing__content__title">
                <u>Lorem ipsum</u> dolor sit amet !
              </h3>
              <p className="lead landing__content__text">
                Phasellus maximus volutpat lacus vel pharetra. Mauris ut mi et
                leo commodo scelerisque. Nunc eget gravida leo, vel dignissim
                lectus. Vivamus eget malesuada felis. Nullam vel mi nec ex
                maximus condimentum a at dui. Pellentesque commodo sollicitudin
                faucibus.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link to="/login">
                  <button className="landing__content__button me-md-2">
                    Let's go Coco !
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>


        <div className="container col-xxl-10 px-4 py-5">
          <div className="row flex-lg-row align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={team}
                alt="équipe Eco-co challenges"
                className="d-block mx-lg-auto img-fluid landing__content__image"
                width="700"
                height="600"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="display-5 lh-2 mb-3 landing__content__title">
                Lorem ipsum dolo<u>r sit amet !</u>
              </h3>
              <p className="lead text-align-end landing__content__text">
                Phasellus maximus volutpat lacus vel pharetra. Mauris ut mi et
                leo commodo scelerisque. Nunc eget gravida leo, vel dignissim
                lectus. Vivamus eget malesuada felis. Nullam vel mi nec ex
                maximus condimentum a at dui. Pellentesque commodo sollicitudin
                faucibus.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link to="/login">
                  <button className="landing__content__button me-md-2">
                    Let's go Coco !
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}
