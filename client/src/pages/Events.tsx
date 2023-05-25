import EventList from "../components/EventComponents/EventList/EventList";
import {useGetProfileQuery, useGetUserEventsQuery} from "../gql/generated/schema";
import {useNavigate} from "react-router-dom";

export default function Events() {
    const navigate = useNavigate();
    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    const { data: events } = useGetUserEventsQuery({
        variables: {
            isOver: true,
            userId: 0,
        },
        errorPolicy: "ignore",
    });

    function navigateToEvent(u: Partial<Event>) {
        navigate(`/user/${currentUser?.profile.id}`);
    }

    return (
        <div>
            <h1>Events</h1>
            <EventList events={events} onUserClick={navigateToEvent}/>
        </div>
    )
}