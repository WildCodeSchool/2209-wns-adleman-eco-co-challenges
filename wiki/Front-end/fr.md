[🇫🇷 Retour au sommaire](../../Readme.md) - [🇬🇧 Back to summary](../Index/en.md)

⚠️ This section is wip ⚠️

# AuthContext

Grace au composant AuthContext nous avons créé un context contenant les information de notre utilisateur connecté.
En englobant la totalité de notre application dans ce context, nous pouvons accéder à ces informations depuis n'importe quel composant.
voici un exemple d'utilisation de ce context ici utilisé pour protéger une route:

```javascript
import { Navigate } from "react-router-dom";
import { UserContext } from "../AuthContext/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode,
}) {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
```

une fois le composant ProtectedRoute créé nous pouvons l'utiliser pour protéger une route en englobant le composant de la route dans le composant ProtectedRoute comme par exemple ici :

```javascript
<UserContextProvider>
  <div>
    <main>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Authentification />} />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friend/:id"
          element={
            <ProtectedRoute>
              <FriendDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends/add"
          element={
            <ProtectedRoute>
              <Friends_add />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/:id"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  </div>
</UserContextProvider>
```

Comme on peut le voir dans l'exemple ci dessus notre UserContextProvider englobe la totalité de notre application ce qui permet d'acceder auxinformation de notre user dans tous les composants. Nous avons donc utilisé le composant ProtectedRoute sur certaines route afin de les protéger sile currentUser n'existe pas (si personne n'est connecté). Pour rappel le composant protectedRoute verifie qu'un user existe si c'est le cas ilrenvoie le children (le composant englobé) sinon il renvoie vers la page de login.

## TODO utiliser ce context partout au lieu fetch les données dans les composants

# Codegen

Codegen est un outil qui permet de générer du code à partir d'une représentation intermédiaire (IR) définie dans un langage de programmation particulier. Il peut être utilisé dans un projet React pour générer automatiquement du code. 
Etapes à suivre : 
  - Installer Codegen en tant que dépendance de développement du projet
      npm install --save-dev @graphql-codegen/cli
  - Créer un fichier codegen.yml pour configurer Codegen à la racine du projet. Ce fichier contient les informations nécessaires pour générer le code, telles que le chemin vers le schéma GraphQL et les modèles à utiliser pour la génération de code. 
  - Exécuter Codegen à partir du terminal en utilisant la commande suivante : 
      npx graphql-codegen
  - Le code généré peut ainsi être utilisé.


