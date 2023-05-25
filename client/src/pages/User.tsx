import {
  useGetProfileQuery,
  useGetUserEventsQuery,
} from "../gql/generated/schema";
import { useNavigate, useParams } from "react-router-dom";

import EventList from "../components/EventComponents/EventList/EventList";
import Footer from "../components/GlobalComponents/Footer/Footer";
import Header from "../components/GlobalComponents/Header/Header";
import User from "../components/UserComponents/User/User";
import { User as UserInterface } from "../gql/generated/schema";
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
      isOver: true,
      userId: Number(currentUser?.profile.id),
    },
    errorPolicy: "ignore",
  });

  function redirectToUserPage(u: Partial<UserInterface>) {
    navigate(`/friend/${u}`);
  }
  function navigateToEvent(u: Partial<Event>) {
    navigate(`/user/${currentUser?.profile.id}`);
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
      <div>
        <User />
      </div>
      {isUserConnected && (
        <>
          <div>
            <EventList events={events} onUserClick={navigateToEvent} />
          </div>
          <div className="d-flex align-content-center justify-content-center gap-5 ">
            <button
              className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill bg-primary text-white"
              type="button"
              onClick={navigateToCreateEvent}
            >
              Créer un événement
            </button>
            <button
              className="btn btn-outline-secondary btn-lg px-4 rounded-pill bg-primary text-white"
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
