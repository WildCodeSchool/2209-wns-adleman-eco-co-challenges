<div style="width: 100%;">
  <a href="https://github.com/nikolalsvk/nikolalsvk/blame/main/welcome.svg">
    <img src="wiki/assets/hello.svg" style="width: 100%;" alt="Click to see the source">
  </a>
<p> Pro tips : les couleurs changent en fonction du thème de votre ordinateur !</p>
</div>

# Readme - 🇫🇷 version
English version : [🇬🇧](wiki/Index/en.md)

⚠️ README EN CONSTRUCTION ⚠️

Version Fran

# Table des matières

- [Introduction](#introduction)
- [Prerequis](#prerequis)
- [Lancer le projet](#lancer-le-projet)
- [Front-end](#front-end)
- [Back-end](#back-end)
- [Test](#test)
- [Deploiement](#deploiement)
- [Readme](#readme)

## Introduction

Le Ecoco-challenges consiste en la création d'une plateforme permettant de lancer des challenges "éco-gestes" 
dans un groupe. L'objectif est de créer un MVP permettant aux utilisateurs de s'inscrire, de se connecter, de créer des 
groupes et de lancer des challenges avec des éco-gestes à accomplir. Les groupes ne durent que pour la durée du 
challenge et chaque éco-geste peut avoir plusieurs niveaux de validation permettant de gagner plus ou moins de points. 
Les utilisateurs peuvent valider les niveaux en quelques clics ou en postant une preuve visuelle. Dans la version 
gratuite, les utilisateurs jouent entre amis, mais les entreprises peuvent souscrire à un abonnement "Partenaire" pour 
créer des challenges par équipe et ajouter des éco-gestes sur mesure. Des interactions sociales peuvent également être 
incluses. Une évolution future consiste à enrichir les éco-gestes avec des informations sur l'équivalent CO2 économisé 
à la fin d'un challenge.

## Prerequis

Docker et docker-compose doivent être installés sur votre machine.

## Lancer le projet

Il y a trois environnements de travail : dévelopement, staging et production. 
Chaque environnement disponse de sa commande pour être lancé, si vous avez npm d'installé sur votre machine vous pouvez
les exécuter avec npm run.

Avec npm :
- environnement local : nmp run start
- environnement staging : npm run start:staging
- environnement prod : npm run start:production

Manuellement : 
- environnement local : docker compose -f docker-compose.yml up --build
- environnement staging : docker compose -f docker-compose.staging.yml pull && docker compose -f docker-compose.staging.yml --env-file .env.staging up 
- environnement prod : docker compose -f docker-compose.production.yml pull && docker compose -f docker-compose.production.yml --env-file .env.production up

## Front-end

Retrouvez la documentation technique du front-end dans le wiki : 
[🇫🇷 version ](wiki/Front-end/fr.md)
[🇬🇧 version ](wiki/Front-end/en.md)

## Back-end

Retrouvez la documentation technique du back-end dans le wiki : 
[🇫🇷 version ](wiki/Back-end/fr.md)
[🇬🇧 version ](wiki/Back-end/en.md)

## Test

Retrouvez la documentation technique des tests dans le wiki : 
[🇫🇷 version ](wiki/Test/fr.md)
[🇬🇧 version ](wiki/Test/en.md)

## Deploiement

Retrouvez la documentation technique du déploiement dans le wiki : 
[🇫🇷 version ](wiki/Deploiement/fr.md)
[🇬🇧 version ](wiki/Deploiement/en.md)

## Readme

Retrouvez la documentation technique du readme dans le wiki : 
[🇫🇷 version ](wiki/Readme/fr.md)
[🇬🇧 version ](wiki/Readme/en.md)


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
