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
      <div>
        <div className="header">
          <Header />
        </div>
        <EventList events={events} onUserClick={navigateToEvent} />
      </div>
      <div className="header">
        <Footer />
      </div>
    </>
  );
}
