import "./ActionList.scss";
import {
    Action,
    GetEventQuery,
    GetUsersDocument,
    useGetProfileQuery,
    useUpdateUserMutation
} from "../../../gql/generated/schema";
import {Maybe} from "type-graphql";
import {guessTargets} from "@graphql-codegen/cli/init/targets";

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
    // get the mutation to update an user (to add friends here)
    const [updateUserMutation] = useUpdateUserMutation();
    // Handle click function to add xp point tu current user
    const handleCompleteActionClick = async (ActionPoints: undefined | Maybe<string>, ElementClicked: String | undefined) => {
        const userId = currentUser?.profile?.id;
        if (ActionPoints !== null && ActionPoints !== undefined &&  userId !== undefined){
            try {

                await updateUserMutation({
                    variables: {
                        userId: userId,
                        data: {
                            xp: parseInt(ActionPoints)
                        }
                    },
                    refetchQueries: [{ query: GetUsersDocument, variables: { userId } }],

                });
                const buttonClick = document.getElementById("button" + ElementClicked);
                if (buttonClick !== null) {
                    // remove the current class
                    buttonClick?.classList.remove("SecondForm__button");
                    // add a new class to modify the color background
                    buttonClick?.classList.add("SecondForm__button__success");
                    // add a new class to add a new animation
                    buttonClick?.classList.add("active");
                    // change the text of the button
                    buttonClick.textContent = "+ " + ActionPoints + " xp !!";
                    // after 5 seconds
                    setTimeout(() => {
                        // remove the new class
                        buttonClick?.classList.remove("SecondForm__button__success");
                        // remove the old active class because the animation is finished
                        buttonClick?.classList.remove("active");
                        // add a new class to modify the color background
                        buttonClick?.classList.add("SecondForm__button");
                        // Add a new class to add a new animation
                        buttonClick?.classList.add("flash-revert");
                        // Change the button text to "Again ?"
                        buttonClick.textContent = "Again ?";

                        // After 1 second (to delay the animation)
                        setTimeout(() => {
                            // Remove the animation class
                            buttonClick?.classList.remove("flash-revert");
                        }, 1000);
                    }, 5000); // 5000 millisecondes = 5 secondes
                }

                console.log(buttonClick);
            } catch (e) {
                console.error(e);
                return false;
            }
        }

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
                                <button className="SecondForm__button" id={"button" + action.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleCompleteActionClick(action?.points, action.id);
                                        }}>
                                    Done !
                                </button>



                            </div>

                        </div>

                    ))}


                    </div>
            </div>

        </div>
    )
}
export default ActionList;