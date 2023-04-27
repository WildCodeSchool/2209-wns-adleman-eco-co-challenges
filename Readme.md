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

# CI

## integration test

### Dockerisation des tests

Les tests d'intégration se trouvent dans le dossier integration-test.
Pour exécuter les test d'intégration des scripts sont présents dans le package.json.
L'ensemble de ces scripts exécutent les tests d'intégration avec docker-compose.
pour les test d'intégration un docker-compose.integration.yml est utilisé.
Il contient 3 services :

- une base de données postgresql buildé depuis une image alpine
- un serveur backend nodejs buildé depuis le dossier server du repos (donc iso à ce qu'on veut tester)
- un testrunner buildé depuis le dossier testrunner du repos. A noter qu'on a donné un contexte au test runner pour que le build se lance depuis la racine du projet.

Il y a un healthcheck sur la base de données pour que le backend puisse attendre que la base de données soit prête avant de se lancer.
On a rajouté un healthcheck sur le serveur backend pour que le testrunner puisse attendre que le serveur soit prêt avant de lancer les tests.

    Le build du testrunner :
        On part d'une image node:lts-alpine et on installe ce dont on va avoir besoin pour tout installer.
        On créé un dossier server et on copi dedans tout ce qui est nescessaire depuis le dossier server du repos (package.json,
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
