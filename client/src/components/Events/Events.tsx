import { gql, useQuery } from "@apollo/client";

const GET_EVENTS = gql`
  query Events {
    events {
      id
      name
      image
    }
  }
`;

const Events = () => {
    const {data} = useQuery(GET_EVENTS);

    console.log(data);

return (
    <>
    
    </>
)
}