import { gql, useQuery } from "@apollo/client";
import UserList from "../UserList/UserList";

const Friends_add = () => {
  const GET_USERS = gql`
    query Users {
      users {
        id
        nickName
        hashedPassword
      }
    }
  `;
  const { data } = useQuery(GET_USERS);

  return (
    <div>
      <UserList users={data?.users} />
    </div>
  );
};

export default Friends_add;
