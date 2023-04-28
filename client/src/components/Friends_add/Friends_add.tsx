import {
  User,
  useGetProfileQuery,
  useUpdateUserMutation,
} from "../../gql/generated/schema";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserList from "../UserList/UserList";

// Write the query to get all users
const GET_USERS = gql`
  query Users {
    users {
      id
      nickName
    }
  }
`;
// The function to render
const FriendsAdd = () => {
  const navigate = useNavigate();
  // get all users
  const { data } = useQuery(GET_USERS);
  // get current user
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  // add a filter to users to get only users who are no friends
  const nonUser = useMemo(() => {
    return data?.users.filter((user: User) => {
      const isCurrentUserFriend = currentUser?.profile?.friends.some(
        (friend) => friend.id === user.id
      );
      return !isCurrentUserFriend;
    });
  }, [data, currentUser]);
  // define a state to modify the users display
  const [usersState, updateUserState] = useState([]);
  // update usersState when nonUser changes
  useEffect(() => {
    updateUserState(nonUser || []);
  }, [nonUser]);
  // get the mutation to update an user (to add friends here)
  const [updateUserMutation] = useUpdateUserMutation();
  // use the mutation to add firends to current user
  const addUserToMyFriends = async (
    friendId: number,
    currentUserId: number
  ): Promise<boolean> => {
    try {
      const result = await updateUserMutation({
        variables: {
          userId: currentUserId,
          data: {
            friendsId: [friendId],
          },
        },
      });
      if (result.data?.updateUser) {
        // update the state of users
        const newUsersState = usersState.filter(
          (user: User) => user.id !== friendId
        );
        updateUserState(newUsersState);
        return true;
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  // handle changes to nonuser
  useEffect(() => {
    const nonUser = data?.users.filter((user: any) => {
      const isCurrentUserFriend = currentUser?.profile?.friends.some(
        (friend) => friend.id === user.id
      );
      return !isCurrentUserFriend;
    });
    updateUserState(nonUser);
  }, [data]);

  // the render
  return (
    <div className="mt-5">
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
                src="https://img.obox.group/u-j1Ak6qH-bdf8cAuch0kBtr8GM=/2280x1282/smart/filters:format(webp)/https%3A%2F%2Flecahier.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fhelena-lopes-pgnqt0rxwls-unsplash.jpg"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                loading="lazy"
                width="700"
                height="500"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Ajouter des amis</h1>
            <p className="lead">
              Bienvenue sur la page ajouter des amis! Ici, vous pouvez voir la liste des
              utilisateurs qui ne sont pas encore vos amis. Vous pouvez
              inviter de nouveaux amis à rejoindre l'application et créer des
              groupes pour participer à des défis écologiques ensemble. Cliquez
              sur un utilisateur pour voir l'ajouter à votre liste d'amis
              Montrez votre engagement écologique en accomplissant des actions durables ensemble!
            </p>
          </div>
        </div>
        <button
            type="button"
            className="btn btn-custom-yellow btn-lg px-4 gap-3 text-center"
            onClick={(e) => navigate("/friends")}
        >
          Retourner à la liste des amis
        </button>
      </div>

      {nonUser && (
        <UserList
          users={usersState}
          onUserClick={addUserToMyFriends}
          onUpdateUsersState={updateUserState}
        />
      )}
    </div>
  );
};

export default FriendsAdd;
