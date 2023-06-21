import "./Event.css";

import { useParams } from "react-router-dom";

const Event = () => {
  const { id } = useParams();

  const randomImageUrl = () => {
    const randomImageNumber = Math.floor(Math.random() * 100) + 1;
    return `https://picsum.photos/500/500?random=${randomImageNumber}&bgcolor=red`;
  };



  return (
    <>
      <>
        <div className="userBody px-4 py-5 my-5 text-center">
          <div className="container px-4 py-5" id="featured-3">
            <div className="align-items-center row g-4 py-5 row-cols-1 row-cols-lg-3">
              <div className="feature col">
                <h3 className="fs-2">titre</h3>
              </div>
              <div className="feature col">
                <img
                  alt="profilePicture"
                  className="profilPicture"
                  src={randomImageUrl()}
                />
              </div>
              <div className="feature col">
                <div id="containerLvl">
                  <span>Niveau : {}</span>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Default striped example"
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-bar progress-bar-striped"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="description-container">
            <h1 className="display-7 fw-bold">Description</h1>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4">Description</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Event;
