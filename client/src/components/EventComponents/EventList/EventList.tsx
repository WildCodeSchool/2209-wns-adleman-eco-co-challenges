import { Link } from "react-router-dom";
import "./EventList.css";

import { useEffect, useState } from "react";

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

  const randomImageUrl = () => {
    const randomImageNumber = Math.floor(Math.random() * 100) + 1;
    return `https://picsum.photos/500/500?random=${randomImageNumber}&bgcolor=red`;
  };
  const { events } = props;

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
              className={`row mx-auto ${
                isMobile ? "row-cols-1" : "row-cols-4"
              }`}
            >
              {events.getEvents?.map((event: any) => (
                <div className="col mb-5" key={event.id}>
                  <Link to={`/event/${event.id}`}>
                    <div className="card shadow-sm mt-3 cursor-pointer">
                      <img
                        className="bd-placeholder-img card-img-top"
                        alt={event.title}
                        width="100%"
                        height="225"
                        src={randomImageUrl()}
                      />
                      <div className="card-body">
                        <p className="card-text">{event.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-body-secondary">9 mins</small>
                        </div>
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
