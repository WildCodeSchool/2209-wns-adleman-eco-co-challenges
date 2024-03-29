import "./User.css";
import { useEffect } from "react";
import { useGetUsersQuery } from "../../gql/generated/schema";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const { data } = useGetUsersQuery({
    errorPolicy: "ignore",
  });
  const selectedUser = data?.users?.find((user) => user.id === Number(id));
  let barXp = (selectedUser?.xp ?? 0) % 100;
  let barWidth = barXp + "%";
  let lvl = Math.floor((selectedUser?.xp ?? 0) / 100);

  useEffect(() => {
    const fillElement = document.getElementById("fill");
    if (fillElement !== null) {
      fillElement.style.width = barWidth;
    }
  }, [barWidth]);
  const backgroundImageLvlGenerator = (lvl: number) => {
    const lvlExpression = Math.floor((lvl ?? 0) / 10);
    return Math.min(lvlExpression, 10).toString();
  };
  const backgroundImageLvl = backgroundImageLvlGenerator(lvl);

  console.log(backgroundImageLvl);
  return (
    <>
      <>
        {/* // ON CHANGE LE STYLE DE LA PAGE */}

        <div
            className="userBody px-4 py-5 my-5 text-center"
            style={{
                    backgroundImage: `url(${require("../../assets/" + backgroundImageLvl + ".png")})`,
                }}
    >
          <div className="container px-4 py-5" id="featured-3">
            <div className="align-items-center row g-4 py-5 row-cols-1 row-cols-lg-3">
              <div className="feature col">
                <h3 className="fs-2">{selectedUser?.nickName}</h3>
              </div>
              <div className="feature col">
                <img
                  alt="profilePicture"
                  className="profilPicture"
                  src={
                    selectedUser?.image ??
                    require("../../assets/cartonRouge.png")
                  }
                />
              </div>
              <div className="feature col">
                <div id="containerLvl">
                  <span>Niveau : {lvl}</span>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Default striped example"
                    aria-valuenow={barXp}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-bar progress-bar-striped"
                      style={{ width: barWidth }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="description-container">
            <h1 className="display-5 fw-bold">Description</h1>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4">{selectedUser?.description}</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default User;
