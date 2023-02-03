import { useParams } from "react-router-dom";

const Users = () => {
  const { id } = useParams();
  console.log(id);
  return <p>Page user</p>;
};

export default Users;
