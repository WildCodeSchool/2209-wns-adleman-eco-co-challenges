import { useGetProfileQuery, useGetUserEventsQuery } from "../gql/generated/schema";
import { useNavigate, useParams } from "react-router-dom";
import DashboardUserList from "../components/DashboardUserList/DashboardUserList";
import EventList from "../components/EventList/EventList";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import User from "../components/User/User";
import { User as UserInterface } from "../gql/generated/schema";

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
              <div className="d-flex align-content-center justify-content-center gap-5 ">
                <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill bg-primary text-white"
                        type="button"
                        onClick={navigateToCreateEvent}>
                  Créer un événement
                </button>
                <button className="btn btn-outline-secondary btn-lg px-4 rounded-pill bg-primary text-white"
                        type="button"
                        onClick={navigateToEvents}>
                  Voir tous les événements
                </button>
              </div>
            <div>
              <div>
                <EventList events={events} onUserClick={navigateToEvent}/>
              </div>
              <div>
                <DashboardUserList
                    users={currentUser?.profile.friends ?? []}
                    onUserClick={redirectToUserPage}/>
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
