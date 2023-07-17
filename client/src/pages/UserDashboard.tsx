import {
  User as UserInterface,
  useGetProfileQuery,
  useGetUserEventsQuery,
} from "../gql/generated/schema";
import { useNavigate, useParams } from "react-router-dom";
import "./pages.css";
import EventList from "../components/EventComponents/EventList/EventList";
import Footer from "../components/GlobalComponents/Footer/Footer";
import Header from "../components/GlobalComponents/Header/Header";
import User from "../components/UserComponents/User/User";
import UserListDashboard from "../components/UserComponents/UserListDashboard/UserListDashboard";

export default function UserDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const isUserConnected = Number(currentUser?.profile.id) === Number(id);
  const { data: events } = useGetUserEventsQuery({
    variables: {
      isOver: false,
      userId: Number(currentUser?.profile.id),
    },
    errorPolicy: "ignore",
  });
  let lvl = Math.floor((currentUser?.profile.xp ?? 0) / 100);
  const backgroundImageLvlGenerator = (lvl: number) => {
    const lvlExpression = Math.floor((lvl ?? 0) / 10);
    return Math.min(lvlExpression, 10).toString();
  };
  const backgroundImageLvl = backgroundImageLvlGenerator(lvl);

  function redirectToUserPage(u: Partial<UserInterface>) {
    navigate(`/friend/${u}`);
  }
  function navigateToEvent(u: Partial<Event>) {
    navigate(`/event/:id`);
  }
  function navigateToCreateEvent(u: Partial<Event>) {
    navigate(`/event/create`);
  }
  function navigateToEvents(u: Partial<Event>) {
    navigate(`/events`);
  }

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div
        className="userBody px-4 py-5 my-5 text-center"
        style={{
          backgroundImage: `url(${require("../assets/" +
            backgroundImageLvl +
            ".png")})`,
        }}
      >
        <div>
          <User />
        </div>
        <button
                className="d-inline-flex align-items-center btn btn-lg ecoco-button"
                type="button"
                onClick={navigateToCreateEvent}
              >
                Créer un événement
              </button>
        {isUserConnected && (
          <>
            <div>
              {events ? (
                <EventList events={events} onUserClick={navigateToEvent} />
                
              ) : (
                <>
                  <p className="fs-2 mb-5 fw-bold text-center">
                    Mes challenges
                  </p>
                  <p className="fs-4 mb-5 text-center">
                    Aucun événement disponible pour le moment.
                  </p>
                </>
              )}
            </div>
            <div className="d-flex align-content-center justify-content-center gap-5">
              <button
                className="btn  btn-lg px-4 ecoco-button"
                type="button"
                onClick={navigateToEvents}
              >
                Voir tous les événements
              </button>
            </div>
            <div>
              <div>
                <UserListDashboard
                  users={currentUser?.profile.friends ?? []}
                  onUserClick={redirectToUserPage}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
