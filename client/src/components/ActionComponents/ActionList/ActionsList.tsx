import "./ActionList.css";
import {Action, GetEventQuery, useGetProfileQuery} from "../../../gql/generated/schema";
import {Maybe} from "type-graphql";

interface props {
    event: GetEventQuery|undefined;
}
const ActionList = (Props: props) => {
    // Get current user
    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    // Get event
    const {event} = Props;
    // Get event's actions
    const actions = event?.getEvent?.actions;

    // Handle click function to add xp point tu current user
    const handleCompleteActionClick = (ActionPoints: undefined | Maybe<string>) => {
        // récupère l'xp de l'action
        console.log(ActionPoints);
    }

    return (
        <div className="container px-4 py-5">
            <h2 className="pb-2 border-bottom">
                Les Eco gestes à réaliser pour cet évènement
            </h2>

            <div className="d-flex flex-column gap-5 my-5">
                <div className="col-8 d-flex flex-column align-items-start gap-2">
                    <h2 className="fw-bold text-body-emphasis">
                        Pour chaque évènement, nous vous proposons une liste d'actions à réaliser
                    </h2>
                    <p className="text-body-secondary">
                        Le but de chaque évènement est de vous sensibiliser à l'écologie sur des sujets
                        auxquels vous n'auriez pas forcément pensé au quotidien. Pour vous aider le créateur de cet
                        évènement vous propose une liste d'actions à réaliser !!
                    </p>
                </div>

                <div className="d-flex flex-column mx-5 gap-5">
                        {/* First item */}

                    {actions?.map((action: Partial<Action>) => (
                        <div className="d-flex flex-column gap-4">
                            {/* séparator yellow */}
                            <div className="d-flex flex-column">
                                <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-custom-yellow bg-gradient fs-4 rounded-3">
                                    <svg className="bi custom-yellow" width="1em" height="1em">
                                    </svg>
                                </div>
                            </div>
                            {/* content item */}
                            <div className="d-flex flex-row justify-content-between g">
                                {/* title and description */}
                                <div className="d-flex flex-column">

                                    <h4 className="fw-semibold mb-0 text-body-emphasis">
                                        {action.title}
                                    </h4>
                                    <p className="text-body-secondary">
                                        {action.description}
                                    </p>
                                </div>
                                {/* Button  */}
                                <button className="SecondForm__button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleCompleteActionClick(action?.points);
                                        }}>
                                    Done !
                                </button>
                            </div>
                        </div>
                    ))}


                    </div>
            </div>
        </div>    )
}
export default ActionList;