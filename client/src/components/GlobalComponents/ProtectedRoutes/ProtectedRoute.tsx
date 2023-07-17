import LoadingSpinner from "../loader/loader";
import { Navigate } from "react-router-dom";
import { useGetProfileQuery } from "../../../gql/generated/schema";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

  const { data: user, loading: loader} = useGetProfileQuery({
    errorPolicy: "ignore",
  });

if(loader){
  return <LoadingSpinner/>
}

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}