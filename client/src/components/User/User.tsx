import "./User.css";

import Header from "../Header/Header";
import { useEffect } from "react";
import { useGetUsersQuery } from "../../gql/generated/schema";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();

  const selectedUser = useGetUsersQuery().data?.users?.find(
    (user) => user.id === Number(id)
  );

  let barXp = (selectedUser?.xp ?? 0) % 100;

  useEffect(() => {
    let w = barXp + "%";
    const fillElement = document.getElementById("fill");
    if (fillElement !== null) {
      fillElement.style.width = w;
    } 
  }, [barXp]);

let lvl = Math.floor((selectedUser?.xp ?? 0) / 100);

  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="UserBody">
        <div className="nickName">{selectedUser?.nickName}</div>
        <div>
          <img alt="profilePicture" className="profilPicture" src={selectedUser?.image ?? ""} />
        </div>
        <div id="containerLvl">
          <span>Niveau: {lvl}</span>
          <div id="bar">
            <div id="fill"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
