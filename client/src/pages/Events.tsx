import EventList from "../components/EventComponents/EventList/EventList";
import Footer from "../components/GlobalComponents/Footer/Footer";
import Header from "../components/GlobalComponents/Header/Header";
import {
  useGetProfileQuery,
  useGetUserEventsQuery,
} from "../gql/generated/schema";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const navigate = useNavigate();
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const { data: events } = useGetUserEventsQuery({
    variables: {
      isOver: false,
      userId: 0,
    },
    errorPolicy: "ignore",
  });

  function navigateToEvent(u: Partial<Event>) {
    navigate(`/user/${currentUser?.profile.id}`);
  }

  return (
    <>
      {/* Nav bar */}
      <div className="header">
        <Header />
      </div>
      {/* Heroe section */}
      <div className="text-center text-lg-start album pt-5 mt-5">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Liste des ecoco challenges
        </h1>
        <p className="col-lg-10 fs-4">
            Les ecoco challenges sont des défis à relever pour améliorer votre impact écologique.
            N'hésitez pas à vous inscrire à un ecoco challenge pour participer à la communauté et gagner des points !
        </p>
      </div>
        {/* Event list */}
      <EventList events={events} onUserClick={navigateToEvent} />
      {/* Footer */}
      <Footer />
    </>
  );
}
