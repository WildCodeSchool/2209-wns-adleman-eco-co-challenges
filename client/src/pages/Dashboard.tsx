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

    </>
  );
}
