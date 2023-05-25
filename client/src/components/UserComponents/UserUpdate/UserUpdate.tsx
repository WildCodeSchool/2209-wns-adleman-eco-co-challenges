import "./UserUpdate.css";
import { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../gql/generated/schema";
import { useParams } from "react-router-dom";

const UserUpdate = () => {
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

  const [textareaValue, setTextareaValue] = useState("");
  useEffect(() => {
    const retrievedValue = selectedUser?.description;

    setTextareaValue(retrievedValue || "Votre description");
  }, []);

  const [updateUserMutation] = useUpdateUserMutation();
  const [loginValue, setLoginValue] = useState("");
  const userId = selectedUser?.id ?? 0;

  const handleSave = async () => {
    try {
    
      const variables = {
        userId: userId,
        data: {
          nickName: loginValue,
          description: textareaValue,
        },
      };

      const { data } = await updateUserMutation({ variables });
      console.log("Données mises à jour :", data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <>
      <>
        <div
          className="userBody px-4 py-5 my-5 text-center"
          style={{
            backgroundImage: `url(${require("../../../assets/" +
              backgroundImageLvl +
              ".png")})`,
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
                    require("../../../assets/cartonRouge.png")
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
          <div className="mb-5">
            <form>
              <label htmlFor="label-login" className="form-label text-center">
                Login
              </label>
              <input
                className="update-login"
                placeholder={selectedUser?.nickName}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
              />
              <div className="mt-4 mb-3">
                <label
                  htmlFor="update-description"
                  className="form-label text-center"
                >
                  Description
                </label>
                <textarea
                  className="update-description"
                  rows={4}
                  defaultValue={textareaValue}
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
              </div>
            </form>
            <button className="btn ecoco-button " onClick={handleSave}>
              Enregistrer
            </button>
          </div>
        </div>
      </>
    </>
  );
};

export default UserUpdate;
