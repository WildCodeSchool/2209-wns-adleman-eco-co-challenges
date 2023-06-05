import "./UserUpdate.css";
import { useState, useEffect } from "react";
import {
  GetUsersDocument,
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

  const [textareaValue, setTextareaValue] = useState("");
  useEffect(() => {
    const retrievedValue = selectedUser?.description;

    setTextareaValue(retrievedValue || "Votre description");
  }, [selectedUser]);

  useEffect(() => {
    setLoginValue(selectedUser?.nickName || "");
  }, [selectedUser]);

  const handleSave = async () => {
    if (
      typeof userId !== "undefined" &&
      typeof loginValue !== "undefined" &&
      typeof textareaValue !== "undefined"
    ) {
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
      await updateUserMutation({
        variables: {
          userId: userId,
          data: updatedData,
        },
        onCompleted: () => {
          toast.success("Ton profil a été mis à jour !");
          navigate(`/user/${id}`);
        },
        onError: (err) => {
          console.error(err);
          toast.error("une erreur est survenue");
        },
        refetchQueries: [{ query: GetUsersDocument, variables: { userId } }],
      });
    }
  };

  return (
    <>
      <div className="body">
        <div className="text-center">
          <div className="container px-4 py-5" id="container-header">
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
                    require("../../../assets/avatarToucan.png")
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
          <div className="UserUpdate">
            <div className="body">
              <div className="container" id="container">
                <div className="title-container">
                  <h1>Salut l'ami !</h1>
                  <br />
                </div>
                <div className="form-container">
                  <div className="overlay">
                    <div className="overlay-panel overlay-right">
                      <form>
                        <h2>Ici tu peux changer tes données</h2>
                        <input
                          type="text"
                          className="form-control rounded-3"
                          value={loginValue}
                          onChange={(e) => setLoginValue(e.target.value)}
                        />
                        <textarea
                          className="form-control rounded-3"
                          id="floatingDescription"
                          rows={5}
                          cols={60}
                          defaultValue={textareaValue}
                          value={textareaValue}
                          onChange={(e) => setTextareaValue(e.target.value)}
                        />
                        <button className="mt-3" onClick={handleSave}>Enregistrer</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserUpdate;
