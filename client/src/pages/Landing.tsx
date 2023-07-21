import Footer from "../components/GlobalComponents/Footer/Footer";
import { Link } from "react-router-dom";
import bananaLeft from "../assets/bananas-r.png";
import bananaRight from "../assets/bananas-l.png";
import logo from "../assets/logo300-1.png";
import team from "../assets/landing-pic.png";
import {useGetProfileQuery} from "../gql/generated/schema";

export default function Landing() {

  const { data: currentUser } = useGetProfileQuery({
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  });

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
          <p className="landing__text landing__paragraph">Nous n'héritons pas de la Terre de nos ancêtres, nous l'empruntons à nos enfants." - Antoine de Saint-Exupéry
            {"\n"}
            "Nous avons la responsabilité envers les générations futures de laisser une planète qui n'est pas dévastée par notre empreinte." - Barack Obama
            <p className="landing__paragraph">
              <img src={bananaLeft} alt="guillemets bananes" />
            </p>
          </p>
        </div>
        <Link to={currentUser ? `/user/${currentUser.profile.id}` : "/login"}>
          <button className="ecoco-button"> Let's go Coco !</button>
        </Link>

        <div className="container col-xxl-10 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={"https://images.unsplash.com/photo-1682686581580-d99b0230064e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
                alt="équipe Eco-co challenges"
                className="d-block mx-lg-auto img-fluid landing__content__image"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="display-5 lh-2 mb-3 landing__content__title">
                Là Ou on va on n'a pas besoin de routes
              </h3>
              <p className="lead landing__content__text">
                Le recyclage des déchets est une pratique essentielle pour la préservation de notre environnement. En redonnant une nouvelle vie aux matériaux usagés, le recyclage permet de réduire la quantité de déchets enfouis ou incinérés, limitant ainsi la pollution et les émissions de gaz à effet de serre. De plus, il permet de préserver les ressources naturelles en évitant l'extraction de nouvelles matières premières.

                Le processus de recyclage commence par la collecte sélective des déchets recyclables tels que le plastique, le papier, le verre et le métal.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link to={currentUser ? `/user/${currentUser.profile.id}` : "/login"}>
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
                Nom de Zeus Marty !
              </h3>
              <p className="lead text-align-end landing__content__text">
                Outre ses bienfaits environnementaux, le recyclage contribue également à la création d'emplois locaux et à la stimulation de l'économie circulaire. En adoptant des pratiques responsables en matière de recyclage, nous participons activement à la préservation de notre planète pour les générations futures. Chacun de nous peut jouer un rôle essentiel en triant nos déchets et en encourageant les initiatives de recyclage dans nos communautés. Ensemble, nous pouvons faire une réelle différence pour préserver notre environnement et favoriser un avenir durable.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link to={currentUser ? `/user/${currentUser.profile.id}` : "/login"}>
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
