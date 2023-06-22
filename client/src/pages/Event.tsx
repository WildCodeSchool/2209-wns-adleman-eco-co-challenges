import ActionList from "../components/ActionComponents/ActionList/ActionsList";
import Footer from "../components/GlobalComponents/Footer/Footer";
import Header from "../components/GlobalComponents/Header/Header";
import EventItem from "../components/EventComponents/EventItem/EventItem";
import { useGetEventQuery } from "../gql/generated/schema";
import { useParams } from "react-router-dom";

export default function Event() {
  const { id } = useParams();
  const parsedId = typeof id === "string" ? parseInt(id) : 0;

  const { data: event } = useGetEventQuery({
    variables: {
      getEventId: parsedId,
    },
    errorPolicy: "ignore",
  });

  console.log(event);
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div>
        <EventItem  event={event}/>
      </div>
      <div>
        <h1>Event</h1>
        <ActionList event={event} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
