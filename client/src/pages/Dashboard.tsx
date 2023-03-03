import Header from "../components/Header/Header";
import { useGetProfileQuery } from "../gql/generated/schema";

export default function Dashboard() {
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  console.log("curent user", currentUser);

  return (
    <>
      <Header />
      <h4>Là c'est le tableau récap sur lequel on arrive une fois connecté</h4>
      <p>
        Je ne comprends pas pourquoi ça ne marche pas... C'est très énervant!
      </p>
    </>
  );
}
