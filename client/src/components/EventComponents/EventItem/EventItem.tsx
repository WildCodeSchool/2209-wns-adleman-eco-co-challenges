import "./EventItem.css";

import {
  GetEventQuery,
  useGetProfileQuery,
  useUpdateEventMutation,
} from "../../../gql/generated/schema";

interface props {
  event: GetEventQuery | undefined;
}

const EventItem = (Props: props) => {
  const [updateEvent] = useUpdateEventMutation();
  // Get current user
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  // Get event
  const { event } = Props;

  const formatDate = (dateString: any) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined);
  };

  // Get event's id, name and description
  const userId = currentUser?.profile?.id;
  const eventId = event?.getEvent?.id;
  const titre = event?.getEvent?.name;
  const StartDate = formatDate(event?.getEvent?.startDate);
  const endDate = formatDate(event?.getEvent?.endDate);
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

  async function registerToEvent() {
    if (userId !== undefined && eventId !== undefined) {
      await updateEvent({
        variables: {
          eventId: parseInt(eventId),
          data: {
            participantsId: [userId],
            participantsAction: "add",
          },
        },
      });
    }
  }
  return (
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
                src={event?.getEvent?.image ?? randomImageUrl()}
              />
            </div>
            <div className="feature col">
              <p className="fs-2">Début: {StartDate} </p> <p className="fs-2">Fin: {endDate}</p>
            </div>
            {!registeredUser() && (
              <div className="feature col">
                <button
                  className="d-inline-flex align-items-center btn btn-lg ecoco-button"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    registerToEvent();
                  }}
                >
                  Participer à ce challenge
                </button>
              </div>
            )}
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
  );
};

export default EventItem;
