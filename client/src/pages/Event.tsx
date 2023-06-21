import ActionList from "../components/ActionComponents/ActionList/ActionsList";
import {useGetEventQuery} from "../gql/generated/schema";
import { useParams } from "react-router-dom";

export default function Event() {
    const { id } = useParams();
    const parsedId = typeof id === "string" ? parseInt(id) : 0;

    const {data: event} = useGetEventQuery({
        variables: {
            getEventId: parsedId,
        },
        errorPolicy: "ignore",
    });

    console.log(event);
    return (
        <div>
            <h1>Event</h1>
            <ActionList event={event} />
        </div>
    )
}