import {
  User,
  useGetProfileQuery,
  useUpdateUserMutation,
} from "../../gql/generated/schema";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

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
  // get all users
  const { data } = useQuery(GET_USERS);
  // get current user
  const { data: currentUser } = useGetProfileQuery({
    fetchPolicy: "no-cache",
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
    <div>
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
