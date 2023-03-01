import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { User } from "../../gql/generated/schema";

const randomUser = () => {
  const gender = ["male", "female"];
  const rand = Math.floor(Math.random() * gender.length);
  return (
    "https://xsgames.co/randomusers/assets/avatars/" +
    gender[rand] +
    "/" +
    Math.floor(Math.random() * 100) +
    ".jpg"
  );
};

interface Props {
  users: User[];
}

const UserList = (props: Props) => {
  const navigate = useNavigate();
  const { users } = props;

  function redirectToUserPage(e: React.MouseEvent<HTMLElement>, user: User) {
    e.preventDefault();
    const path = "/friend/" + user.id;
    navigate(path);
  }

  return (
    <div className="album py-5 bg-light">
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row row-cols-1 row-cols-sm-3 row-cols-md-5 g-5">
          {users?.map((user: User) => (
            <div
              onClick={(e) => redirectToUserPage(e, user)}
              className="col pe-auto"
              style={{ width: "200px" }}
              role="button"
            >
              <div className="card shadow-sm">
                <img src={randomUser()} alt="" loading="lazy" />
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c"></rect>
                <div className="card-body">
                  <h3 className="card-text text-center">{user.nickName}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="btn btn-custom-yellow btn-lg px-4 gap-3 text-center"
        onClick={() => console.log("coucou")}
      >
        osef
      </button>
    </div>
  );
};

export default UserList;
