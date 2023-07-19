import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Action = {
  __typename?: 'Action';
  description?: Maybe<Scalars['String']>;
  events: Array<Event>;
  id: Scalars['ID'];
  points?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ActionInput = {
  description?: InputMaybe<Scalars['String']>;
  eventId?: InputMaybe<Scalars['Float']>;
  points?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  actions?: Maybe<Array<Action>>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  participants?: Maybe<Array<User>>;
  startDate?: Maybe<Scalars['DateTime']>;
};

export type EventInput = {
  actionsId?: InputMaybe<Array<Scalars['Float']>>;
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Float']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  participantsAction?: InputMaybe<Scalars['String']>;
  participantsId?: InputMaybe<Array<Scalars['Float']>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAction: Action;
  createEvent: Event;
  createUser: User;
  deleteAction: Action;
  login: Scalars['String'];
  logout: Scalars['String'];
  removeFriendUser: User;
  subscribeToEvent: User;
  updateEvent: Event;
  updateUser: User;
};


export type MutationCreateActionArgs = {
  data: ActionInput;
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteActionArgs = {
  actionId: Scalars['Float'];
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationRemoveFriendUserArgs = {
  friendToRemoveId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationSubscribeToEventArgs = {
  eventId: Scalars['Float'];
  userId: Scalars['Float'];
};


export type MutationUpdateEventArgs = {
  data: EventInput;
  eventId: Scalars['Float'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  userId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  actions: Array<Action>;
  getEvent: Event;
  getEvents: Array<Event>;
  profile: User;
  users: Array<User>;
};


export type QueryGetEventArgs = {
  id: Scalars['Float'];
};


export type QueryGetEventsArgs = {
  isOver: Scalars['Boolean'];
  userId?: InputMaybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  description?: Maybe<Scalars['String']>;
  eventOfUser: Array<Event>;
  friends: Array<User>;
  hashedPassword: Scalars['String'];
  id: Scalars['Float'];
  image?: Maybe<Scalars['String']>;
  nickName: Scalars['String'];
  role?: Maybe<Scalars['String']>;
  xp?: Maybe<Scalars['Float']>;
};

export type UserInput = {
  description?: InputMaybe<Scalars['String']>;
  eventOfUser?: InputMaybe<Array<Scalars['Float']>>;
  friendsId?: InputMaybe<Array<Scalars['Float']>>;
  image?: InputMaybe<Scalars['String']>;
  nickName: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  xp?: InputMaybe<Scalars['Float']>;
};

export type UserUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  friendsId?: InputMaybe<Array<Scalars['Float']>>;
  image?: InputMaybe<Scalars['String']>;
  nickName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  xp?: InputMaybe<Scalars['Float']>;
};

export type CreateActionMutationVariables = Exact<{
  data: ActionInput;
}>;


export type CreateActionMutation = { __typename?: 'Mutation', createAction: { __typename?: 'Action', title?: string | null, points?: string | null, description?: string | null, events: Array<{ __typename?: 'Event', id: string }> } };

export type GetEventQueryVariables = Exact<{
  getEventId: Scalars['Float'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent: { __typename?: 'Event', id: string, name?: string | null, description?: string | null, endDate?: any | null, image?: string | null, startDate?: any | null, actions?: Array<{ __typename?: 'Action', id: string, points?: string | null, title?: string | null, description?: string | null }> | null, participants?: Array<{ __typename?: 'User', id: number }> | null } };

export type UpdateEventMutationVariables = Exact<{
  eventId: Scalars['Float'];
  data: EventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', id: string, participants?: Array<{ __typename?: 'User', id: number }> | null } };

export type GetEventsQueryVariables = Exact<{
  isOver: Scalars['Boolean'];
}>;


export type GetEventsQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'Event', id: string, name?: string | null, image?: string | null, endDate?: any | null, startDate?: any | null, participants?: Array<{ __typename?: 'User', id: number }> | null, actions?: Array<{ __typename?: 'Action', title?: string | null, points?: string | null, description?: string | null }> | null }> };

export type GetUserEventsQueryVariables = Exact<{
  userId: Scalars['Float'];
  isOver: Scalars['Boolean'];
}>;


export type GetUserEventsQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'Event', id: string, name?: string | null, description?: string | null, image?: string | null, endDate?: any | null, startDate?: any | null, participants?: Array<{ __typename?: 'User', id: number }> | null, actions?: Array<{ __typename?: 'Action', title?: string | null, points?: string | null, description?: string | null }> | null }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', xp?: number | null, role?: string | null, nickName: string, image?: string | null, description?: string | null, id: number, friends: Array<{ __typename?: 'User', nickName: string, image?: string | null }>, eventOfUser: Array<{ __typename?: 'Event', image?: string | null, name?: string | null, startDate?: any | null, endDate?: any | null }> }> };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['Float'];
  data: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', description?: string | null, image?: string | null, hashedPassword: string, xp?: number | null, friends: Array<{ __typename?: 'User', id: number }> } };

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, nickName: string, xp?: number | null, description?: string | null, image?: string | null, friends: Array<{ __typename?: 'User', id: number, nickName: string }> } };

export type LoginMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };


export const CreateActionDocument = gql`
    mutation createAction($data: ActionInput!) {
  createAction(data: $data) {
    title
    points
    description
    events {
      id
    }
  }
}
    `;
export type CreateActionMutationFn = Apollo.MutationFunction<CreateActionMutation, CreateActionMutationVariables>;

/**
 * __useCreateActionMutation__
 *
 * To run a mutation, you first call `useCreateActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActionMutation, { data, loading, error }] = useCreateActionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateActionMutation(baseOptions?: Apollo.MutationHookOptions<CreateActionMutation, CreateActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActionMutation, CreateActionMutationVariables>(CreateActionDocument, options);
      }
export type CreateActionMutationHookResult = ReturnType<typeof useCreateActionMutation>;
export type CreateActionMutationResult = Apollo.MutationResult<CreateActionMutation>;
export type CreateActionMutationOptions = Apollo.BaseMutationOptions<CreateActionMutation, CreateActionMutationVariables>;
export const GetEventDocument = gql`
    query GetEvent($getEventId: Float!) {
  getEvent(id: $getEventId) {
    id
    name
    actions {
      id
      points
      title
      description
    }
    description
    endDate
    image
    startDate
    participants {
      id
    }
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      getEventId: // value for 'getEventId'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($eventId: Float!, $data: EventInput!) {
  updateEvent(eventId: $eventId, data: $data) {
    id
    participants {
      id
    }
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const GetEventsDocument = gql`
    query GetEvents($isOver: Boolean!) {
  getEvents(isOver: $isOver) {
    id
    name
    participants {
      id
    }
    image
    actions {
      title
      points
      description
    }
    endDate
    startDate
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      isOver: // value for 'isOver'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetUserEventsDocument = gql`
    query GetUserEvents($userId: Float!, $isOver: Boolean!) {
  getEvents(userId: $userId, isOver: $isOver) {
    id
    name
    description
    participants {
      id
    }
    image
    actions {
      title
      points
      description
    }
    endDate
    startDate
  }
}
    `;

/**
 * __useGetUserEventsQuery__
 *
 * To run a query within a React component, call `useGetUserEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      isOver: // value for 'isOver'
 *   },
 * });
 */
export function useGetUserEventsQuery(baseOptions: Apollo.QueryHookOptions<GetUserEventsQuery, GetUserEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEventsQuery, GetUserEventsQueryVariables>(GetUserEventsDocument, options);
      }
export function useGetUserEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEventsQuery, GetUserEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEventsQuery, GetUserEventsQueryVariables>(GetUserEventsDocument, options);
        }
export type GetUserEventsQueryHookResult = ReturnType<typeof useGetUserEventsQuery>;
export type GetUserEventsLazyQueryHookResult = ReturnType<typeof useGetUserEventsLazyQuery>;
export type GetUserEventsQueryResult = Apollo.QueryResult<GetUserEventsQuery, GetUserEventsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    xp
    role
    nickName
    image
    description
    id
    friends {
      nickName
      image
    }
    eventOfUser {
      image
      name
      startDate
      endDate
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userId: Float!, $data: UserUpdateInput!) {
  updateUser(userId: $userId, data: $data) {
    description
    image
    hashedPassword
    xp
    friends {
      id
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetProfileDocument = gql`
    query GetProfile {
  profile {
    id
    nickName
    friends {
      id
      nickName
    }
    xp
    description
    image
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;