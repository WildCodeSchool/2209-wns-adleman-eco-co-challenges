import { useParams } from "react-router-dom";

const Users = () => {
  const { id } = useParams();
  return <p>Page user</p>;
};

export default Users;
