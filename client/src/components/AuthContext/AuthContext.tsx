import { createContext, useEffect, useState } from "react";

import { useGetProfileQuery } from "../../gql/generated/schema";

interface UserContextType {
    user: string;
    setUser: (username: string) => void;
  }
  
  export const UserContext = createContext<UserContextType>({
    user: '',
    setUser: () => {},
  });

interface AuthContextProps{
    children: any
}

export default function UserContextProvider ({children}: AuthContextProps ) {
    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
      });
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  // On va chercher le profil de l'utilisateur courant
  // au chargement du composant
  useEffect(() => {
    const load = async () => {
      setUser(await currentUser);
      setLoading(false);
    };

    load();
  }, [currentUser]);

  // Si on a pas fini de charger le profil de l'utilisateur
  // on n'affiche rien
  if (loading) {
    return null;
  }

  // Sinon on renvoie le context provider de l'utilisateur
  // avec comme valeur l'utilisateur plus la fonction de mise
  // à jour de ce dernier
  return (
    // eslint-disable-next-line
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}