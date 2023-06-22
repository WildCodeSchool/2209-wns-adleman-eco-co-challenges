import { toast } from "react-hot-toast";
import {
  GetEventQuery,
  useGetProfileQuery,
} from "../../../gql/generated/schema";
import "./EventItem.css";

interface props {
  event: GetEventQuery | undefined;
}

const EventItem = (Props: props) => {
  // Get current user
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  // Get event
  const { event } = Props;

  // Get event's name and description
  const titre = event?.getEvent?.name;
  const description = event?.getEvent?.description;

  //Check if user has subscribed
  const registeredUser = () => {
    if (event !== undefined) {
      const response = event?.getEvent?.participants?.map((participant) => {
        return participant.id === currentUser?.profile?.id;
      });
      return response?.includes(true);
    }
  };

  const randomImageUrl = () => {
    const randomImageNumber = Math.floor(Math.random() * 100) + 1;
    return `https://picsum.photos/500/500?random=${randomImageNumber}&bgcolor=red`;
  };

// function registerToEvent = async () => {

//     if (!currentUser?.profile?.id) {
//       return;
//     }
//     const updatedData: EventUpdateInput = {};

   
    // await updateEventMutation({
    //   variables: {
    //     eventId: userId,
    //     data: updatedData,
    //   },
    //   onCompleted: () => {
    //     toast.success("A toi de jouer !");
    //   },
    //   onError: (err) => {
    //     console.error(err);
    //     toast.error("une erreur est survenue");
    //   },
    // });
  }
};
  return (
    <>
      <>
        <div className="userBody px-4 py-5 my-5 text-center">
          <div className="container px-4 py-5" id="featured-3">
            <div className="align-items-center row g-4 py-5 row-cols-1 row-cols-lg-3">
              <div className="feature col">
                <h3 className="fs-2">{titre}</h3>
              </div>
              <div className="feature col">
                <img
                  alt="EventPicture"
                  className="eventPicture"
                  src={randomImageUrl()}
                />
              </div>
              { registeredUser() && <div className="feature col">
              <button
                className="d-inline-flex align-items-center btn btn-lg ecoco-button"
                type="button"
                onClick={registerToEvent()}
              >
                Créer un événement
              </button>
              </div>}
            </div>
          </div>
          <div className="description-container">
            <h1 className="display-7 fw-bold">Description</h1>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4">{description}</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default EventItem;
