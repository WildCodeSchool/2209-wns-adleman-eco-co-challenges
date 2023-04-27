# README IS WIP

# CI

## integration test

### Dockerisation des tests

Les tests d'intégration se trouvent dans le dossier integration-test.
Pour exécuter les tests d'intégration des scripts sont présents dans le package.json.
L'ensemble de ces scripts exécutent les tests d'intégration avec docker-compose.
pour les tests d'intégration un docker-compose.integration.yml est utilisé.
Il contient 3 services :

- une base de données postgresql buildé depuis une image alpine
- un serveur backend nodejs buildé depuis le dossier server du repos (donc iso à ce qu'on veut tester)
- un testrunner buildé depuis le dossier testrunner du repos. A noter qu'on a donné un contexte au test runner pour que le build se lance depuis la racine du projet.

Il y a un healthcheck sur la base de données pour que le backend puisse attendre que la base de données soit prête avant de se lancer.
On a rajouté un healthcheck sur le serveur backend pour que le testrunner puisse attendre que le serveur soit prêt avant de lancer les tests.

    Le build du testrunner :
        On part d'une image node:lts-alpine et on installe ce dont on va avoir besoin pour tout installer.
        On créé un dossier server et on copie dedans tout ce qui est nescessaire depuis le dossier server du repos (package.json,
        dossier src, config, etc...).
        On installe les dépendances du serveur.
        On créé un dossier app pour les tests d'intégration et on copie dedans les fichiers necessaires a l'exécution des
        tests d'intégration (package.json, config, src etc...).
        On installe les dépendances du testrunner.
        On lance les test à l'aide d'un script qui va exécuter les tests à l'aide de Jest.

### Github actions

Pour intégrer les test d'intégrations à la CI de github, on utilise les github actions.
On a créé un fichier .github/workflows/integration-test.yml qui contient la configuration de la CI à exécuter par github.

        Contenu du fichier github action :
        Ce fichier ne contient qu'un seul job "integration-tests" qui tourne sur ubuntu-latest.
        Ce job à 3 étapes :
            - checkout : permet de récupérer le code du repos
            - make envfile : permet de créer un fichier .env à la racine du projet avec les variables d'environnemen
            - test : permet d'exécuter les tests d'intégration à l'aide de docker-compose

Lorsqu'une pull request est créée ou mise à jour, cette action GitHub s'exécute pour vérifier que les tests d'intégration
passent, ce qui aide à garantir la qualité du code avant de fusionner les modifications dans la branche principale.


# Tests e2e avec Playwright

e2e signifie "End-to-End" et fait référence à des tests qui permettent de tester une application du début à la fin, en simulant les actions et les interactions que les utilisateurs peuvent avoir avec l'application. Playwright est une bibliothèque de tests automatisés qui permet de tester des applications web à travers différents navigateurs.Il en existe d'autres comme Cypress par exemple.

Les tests e2e se trouvent dans le dossier e2e-tests.
Playwright prend en charge la sélection d'éléments à l'aide de différents sélecteurs, tels que les sélecteurs d'éléments CSS ou XPath. Cependant, il peut parfois être difficile de sélectionner des éléments spécifiques, surtout si l'application utilise beaucoup d'éléments avec des noms de classe ou des identifiants génériques.
C'est pourquoi nous avons préféré utilisé l'attribut "data-testid". En ajoutant cet attribut à des éléments HTML, il est possible de les identifier de manière unique et de les sélectionner facilement pour les tests Playwright. Exemple dans notre composant Authform :

<input
    data-testid="login-login"
    type="text"
    value={credentials.nickName}
    onChange= {(e) =>
    setCredentials({ ...credentials, nickName: e.target.value })
     }
/>
                
Pour exécuter les tests, des scripts sont présents dans le package.json.
L'ensemble de ces scripts exécutent les tests e2e avec docker-compose, un fichier docker-compose.e2e-tests.yml est utilisé.
Il contient 4 services :

- une base de données postgresql buildé depuis une image alpine,
- un client react buildé depuis le dossier client du repos,
- un backend nodejs buildé depuis le dossier server du repo,
- un testrunner buildé depuis le dossier testrunner du repo. 

Il y a un healthcheck sur la base de données pour que le backend puisse attendre que la base de données soit prête avant de se lancer.
On trouve également un healthcheck sur le backend et un autre sur le client pour que le testrunner puisse attendre que tout soit prêt avant de lancer les tests.

Le build du testrunner est similaire à celui des tests d'intégration.

### Github actions

Pour intégrer les tests e2e à la CI de github, on utilise les github actions.
On a créé un fichier .github/workflows/e2e-tests.yml qui contient la configuration de la CI à exécuter par github.
Ce fichier ne contient qu'un seul job "e2e-tests" qui tourne sur ubuntu-latest.

Lorsqu'une pull request est créée ou mise à jour, cette action GitHub s'exécute pour vérifier que les tests e2e
passent, ce qui aide à garantir la qualité du code avant de fusionner les modifications dans la branche principale.

# CD

La première étape consiste à créer une version de production de notre application.

Client

On créé un dockerfile.production, qui ressemble à celui du dockerfile de développement,
mais qui va build l'application au lieu de la lancer en mode dev.

serveur

C'est un peu la même démarche, on va faire tourner le compilateur typescript pour créer un dossier build en full js qui
pourra s'exécuter sur n'importe quel environnement plus rapidement.

docker-compose.production.yml à la racine

On a une base de donnée postgresql avec un volume défini explicitement pour la persistance des données.
On est censé avoir un réseau particulier à chaque docker compose (pk je ne l'ai pas mis en place ?)

Pour le client et le serveur on utilise des images dockerhub, qui sont des build de nos dockerfile.production.

On rajoute un nginx qui va servir le client et le serveur, il se trouve devant le serveur et le client et va dispatcher
les requêtes en fonction de l'url.

Coté serveur vps, on install webhook qui va avoir 2 hook qui sont sensiblement les mêmes :

- un pour la version staging, qui va déclancher un script de déploiement staging
- un pour la version prod, qui va déclancher un script de déploiement dédié à la prod

On créé un nouveau docker-compose.staging pour la partie staging, qui est sensiblement le même que le
docker-compose.production à la différence que les services s'appellent staging et non prod.
Une différence également est de ne pas simplement pull les images serveur et client mais de pull des tags spécifiques
image: nom/de-l-image:production
image: nom/de-l-image:staging

test

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


