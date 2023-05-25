import { User } from "../../../gql/generated/schema";
import { useGetProfileQuery } from "../../../gql/generated/schema";

// Function to generate a random user url
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
  // The render
  return (
    <>
      <div className="album py-5 bg-light">
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
                      src={user.image ?? randomUser()}
                      alt=""
                      loading="lazy"
                      className="w-100 h-auto"
                    />
                  </div>
                  <div className="card-body">
                    <h3 className="card-text text-center">{user.nickName}</h3>
                  </div>
                </div>
            ))}
              </div>
            </div>
          </div>
    </>
  );
};

export default UserListDashboard;
