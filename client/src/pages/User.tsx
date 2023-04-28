import EventList from "../components/EventList/EventList";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import User from "../components/User/User";
import { useGetEventsQuery } from "../gql/generated/schema";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { data: events} = useGetEventsQuery({
    errorPolicy: "ignore",
  });
  function navigateToEvent() {
    navigate(`/user`);
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
        <EventList events={events} onUserClick={navigateToEvent}/>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
