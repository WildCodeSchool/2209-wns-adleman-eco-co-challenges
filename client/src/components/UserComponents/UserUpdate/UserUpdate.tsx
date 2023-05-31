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
      <div className="container col-5">
        <div className="text-center">
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
                    selectedUser?.image ?? require("../../../assets/avatarToucan.png")
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
          <div className="mb-5 userBody">
            <form>
              <br />
              <input
                className="update-login text-center form-control-lg"
                placeholder={selectedUser?.nickName}
                value={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
              />
              <div className="mt-4 mb-3">

                <br />
                <textarea
                  className="update-description text-center form-control-md"
                  rows={5}
                  cols={60}
                  defaultValue={textareaValue}
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                />
                <button className="btn form__button " onClick={handleSave}>
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserUpdate;
