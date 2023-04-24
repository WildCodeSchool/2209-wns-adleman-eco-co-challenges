import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://backend:4000/",
    fetch,
  }),
  cache: new InMemoryCache(),
});
const createUserMutation = gql`
  mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    id
  }
}
`;

//TODO: add real CRUD tests for each entities
describe("user resolver", () => {
  describe("create user", () => {
    it("should create user given valid attributes", async () => {
      const res = await client.mutate({
        mutation: createUserMutation,
        variables: { data: {
          nickName: "jetest",
          password: "@zazaIHiozaoec55"
          }
        },
      });
      console.log(res.data?.createUser);
      expect(res.data?.createUser).toHaveProperty("id");
    });
  });
});
