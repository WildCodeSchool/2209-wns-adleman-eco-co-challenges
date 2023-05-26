import "./UserUpdate.css";
import { useState, useEffect } from "react";
import {
  GetUsersDocument,
  UserInput,
  UserUpdateInput,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../gql/generated/schema";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UserUpdate = () => {
  const { id } = useParams();
  const { data } = useGetUsersQuery({
    errorPolicy: "ignore",
  });
  const selectedUser = data?.users?.find((user) => user.id === Number(id));
  let barXp = (selectedUser?.xp ?? 0) % 100;
  let barWidth = barXp + "%";
  let lvl = Math.floor((selectedUser?.xp ?? 0) / 100);
  const [updateUserMutation] = useUpdateUserMutation();
  const [loginValue, setLoginValue] = useState("");
  const userId = selectedUser?.id;
  const navigate = useNavigate();

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
  }, [selectedUser]);

  useEffect(() => {
    setLoginValue(selectedUser?.nickName || "");
  }, [selectedUser]);

  const handleSave = async () => {
    console.log("premier test");
    if (
      typeof userId !== "undefined" &&
      typeof loginValue !== "undefined" &&
      typeof textareaValue !== "undefined"
    ) {
      console.log("deuxième test dans le if");
      if (!selectedUser) {
        return;
      }

      const updatedData: UserUpdateInput = {};

      if (loginValue !== "") {
        updatedData.nickName = loginValue;
      }

      if (textareaValue !== "") {
        updatedData.description = textareaValue;
      }

      console.log(
        "troisième test dans le try",
        loginValue,
        textareaValue,
        userId
      );
      updateUserMutation({
        variables: {
          userId: userId,
          data: updatedData,
        },
        onCompleted: () => {
          toast.success("Ton profil a été mis à jour!");
          navigate(`/user/${id}`);
        },
        onError: (err) => {
          console.error(err);
          toast.error("error while saving wilder");
        },
        refetchQueries: [{ query: GetUsersDocument, variables: { userId } }],
      });
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
                Votre nom
              </label>
              <br />
              <input
                className="update-login text-center"
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
                <br />
                <textarea
                  className="update-description text-center"
                  rows={4}
                  cols={60}
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
