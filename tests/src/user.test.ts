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


// const readUsersQuery = gql`
//   query Users {
//     users {
//       nickName
//     }
//   }
// `;

describe("user resolver", () => {
  describe("create user", () => {
    it("should create user given valid attributes", async () => {
      const res = await client.mutate({
        mutation: createUserMutation,
        variables: { data: {
          nickName: "efzefezfzef",
          password: "@zazaIHiozaoec55"
          }
        },
      });
      console.log(res.data?.createUser);
      expect(res.data?.createUser).toHaveProperty("id");
    });

    // it("should not create wilder given invalid attributes and return an error", async () => {
    //   expect(() =>
    //     client.mutate({
    //       mutation: createWilderMutation,
    //       variables: { data: { name: "" } },
    //     })
    //   ).rejects.toThrow();
    // });
  });

  // describe("read wilders", () => {
  //   it("should return an array", async () => {
  //     const res = await client.query({
  //       query: readWildersQuery,
  //       fetchPolicy: "no-cache",
  //     });
  //
  //     expect(res.data.wilders[0]).toHaveProperty("id");
  //     expect(res.data.wilders[0]).toHaveProperty("name");
  //   });
  // });
});
