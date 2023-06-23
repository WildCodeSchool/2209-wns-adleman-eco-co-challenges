import { Link } from "react-router-dom";
import "./EventList.css";

import { useEffect, useState } from "react";
import {useGetProfileQuery} from "../../../gql/generated/schema";

interface Props {
  events: any;
  onUserClick: (...params: any) => any;
}

const EventList = (props: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const randomImageUrl = () => {
    const randomImageNumber = Math.floor(Math.random() * 100) + 1;
    return `https://picsum.photos/500/500?random=${randomImageNumber}&bgcolor=red`;
  };
  const { events } = props;

  const curentUserHaveThisEvent = (event: any): Boolean => {
    const result = event.participants.map((participant: any) => {
      return currentUser?.profile?.id === participant.id;
    })

    return result.includes(true);
  };

  if (!events) {
    return <div>Loading events...</div>;
  }

  return (
    <>
      <div className="album mt-5">
        <h1 className="eventList__title text-center">
          Les Ecoco-challenges en cours
        </h1>
        <div className="container d-flex justify-content-center">
          <div className="eventList-container w-100">
            <div
              className="d-flex flex-wrap gap-5 justify-content-center  "
            >
              {events.getEvents?.map((event: any) => (
                <div className="col-10 col-sm-5 col-md-3 col-lg-2" key={event.id}>

                  <Link to={`/event/${event.id}`}>
                    <div className="card shadow-sm mt-3 cursor-pointer">

                      <div className="position-relative">
                        {
                            curentUserHaveThisEvent(event) && (

                              <div className="position-relative">
                                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success">
                                  inscrit !
                                  <span className="visually-hidden">unread messages</span>
                                </span>
                              </div>
                            )
                        }

                        <img
                            className="bd-placeholder-img card-img-top"
                            alt={event.title}
                            width="100%"
                            height="225"
                            src={randomImageUrl()}
                        />

                      </div>

                      <div className="card-body">
                        <p className="card-text">
                          {event.description.length > 40
                              ? event.description.slice(0, 36) + " ..."
                              : event.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EventList;
