import { User, useGetProfileQuery } from "../../../gql/generated/schema";

import { useNavigate } from "react-router-dom";

// Function to generate a random user url
// type the props
interface Props {
  users: Array<Partial<User>>;
  onUserClick: (...params: any) => any;
}
// the function to render
const UserListDashboard = (props: Props) => {
  // get the props
  const { users, onUserClick } = props;
  // get current user
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const navigate = useNavigate();

  console.log(users)

  // The render
  return (
    <>
      <div className="py-5">
      <p className="fs-2 mb-5 fw-bold text-center">Mes Amis Favoris</p>
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row row-cols-1 row-cols-sm-3 row-cols-md-5 g-5">
            {users?.slice(0, 5).map((user: Partial<User>) => (
              <div
                key={user.id}
                onClick={(e) => {
                  e.preventDefault();
                  onUserClick(user.id, currentUser?.profile?.id);
                }}
                className="col pe-auto"
                style={{ width: "200px" }}
                role="button"
              >
                  <div className="img-container rounded-circle overflow-hidden d-flex justify-content-center align-items-center">
                  <img
                  alt="profilePicture"
                  src={
                    user?.image ??
                   ""
                  }
                />
                  </div>
                  <div className="card-body">
                    <h3 className="card-text text-center">{user.nickName}</h3>
                  </div>
                </div>
            ))}
              </div>
            </div>
            <button
            type="button"
            className="btn ecoco-button btn-lg px-4 gap-3 text-center"
            onClick={(e) => navigate("/friends/add")}
        >
          Ajouter des amis
        </button>
          </div>
    </>
  );
};

export default UserListDashboard;
