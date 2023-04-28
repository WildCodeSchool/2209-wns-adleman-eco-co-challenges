import { useGetEventsQuery, useGetProfileQuery } from "../gql/generated/schema";

import DashboardUserList from "../components/DashboardUserList/DashboardUserList";
import EventList from "../components/EventList/EventList";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import User from "../components/User/User";
import { User as UserInterface } from "../gql/generated/schema";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const { data: events } = useGetEventsQuery({
    errorPolicy: "ignore",
  });

  function redirectToUserPage(u: Partial<UserInterface>) {
    navigate(`/friend/${u}`);
  }
  function navigateToEvent(u: Partial<Event>) {
    navigate(`/user/${currentUser?.profile.id}`);
  }
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div>
        <User />
      </div>
      <div>
        <EventList events={events} onUserClick={navigateToEvent} />
      </div>
      <div>
        <DashboardUserList users={currentUser?.profile.friends ?? []} onUserClick={redirectToUserPage}/>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
