import Footer from "../../GlobalComponents/Footer/Footer";
import Header from "../../GlobalComponents/Header/Header";
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
  onUpdateUsersState: any;
}
// the function to render
const UserList = (props: Props) => {
  // get the props
  const { users, onUserClick } = props;
  // get current user
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  // function that handle user Click and use the parent function and delete the user we add from the state displayed
  const handleUserClick = async (
    userId: number | undefined,
    currentUserId: number | undefined
  ) => {
    if (typeof userId !== "undefined" && typeof currentUser !== "undefined") {
      const isSuccess = await onUserClick(userId, currentUserId);
      if (isSuccess) {
        const newUsers = users.filter((user) => user.id !== userId);
        props.onUpdateUsersState([...newUsers]);
      }
    }
  };
  // The render
  return (
    <>
      <div className="header">
        <Header />
      </div>

      <div className="album py-5 bg-light">
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row row-cols-1 row-cols-sm-3 row-cols-md-5 g-5">
            {/* render the state to modify the display on click */}
            {users?.map((user: Partial<User>) => (
              <div
              key={user.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleUserClick(user.id, currentUser?.profile?.id);
                }}
                className="col pe-auto"
                style={{ width: "200px" }}
                role="button"
              >
                <div className="card shadow-sm">
                  <img
                    src={user.image ?? randomUser()}
                    alt=""
                    loading="lazy"
                  />
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
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default UserList;
