import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query Users {
    users {
      id
      nickName
      password
    }
  }
`;


const Users = () => {
  
  const { data } = useQuery(GET_USERS);

  console.log(data);

  return <p>ICI les users ou pas</p>;
};

export default Users;
