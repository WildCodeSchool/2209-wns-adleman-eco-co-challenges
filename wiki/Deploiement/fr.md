[🇫🇷 Retour au sommaire](../../Readme.md) - [🇬🇧 Back to summary](../Index/en.md)

# CI
### Test d'intégrations

Pour intégrer les test d'intégrations à la CI de github, on utilise les github actions.
On a créé un fichier .github/workflows/integration-test.yml qui contient la configuration de la CI à exécuter par github.

        Contenu du fichier github action :
        Ce fichier ne contient qu'un seul job "integration-tests" qui tourne sur ubuntu-latest.
        Ce job à 3 étapes :
            - checkout : permet de récupérer le code du repos
            - make envfile : permet de créer un fichier .env à la racine du containeur avec les variables d'environnements
            - test : permet d'exécuter les tests d'intégration à l'aide de docker-compose

Lorsqu'une pull request est créée ou mise à jour, cette action GitHub s'exécute pour vérifier que les tests d'intégration
passent, ce qui aide à garantir la qualité du code avant de fusionner les modifications dans la branche principale.

### Tests end to end

Pour intégrer les tests e2e à la CI de github, on utilise les github actions.
On a créé un fichier .github/workflows/e2e-tests.yml qui contient la configuration de la CI à exécuter par github.
Ce fichier ne contient qu'un seul job "e2e-tests" qui tourne sur ubuntu-latest.

Lorsqu'une pull request est créée ou mise à jour, cette action GitHub s'exécute pour vérifier que les tests e2e
passent, ce qui aide à garantir la qualité du code avant de fusionner les modifications dans la branche principale.

# CD

### Deploiement continu staging
- **Introduction**

Le but de la branche staging est de simuler la version production de notre application. Toutes les fonctionnalités et modifications
sont ajoutés sur la branche develop, une fois que cette branche à une version qui nous convient, on la merge sur la
branche staging qui va déclencher les mêmes automatisations que la branche main (production) dans les mêmes conditions. 
Ainsi on peut vérifier que tous le protocole de déploiement est fonctionnelle et tester l'application en ligne dans les
mêmes conditions que la production.

- **Mise en place**

Le merge de la branche develop sur la branche staging va déclencher le workflow Github Actions deploy-staging.yml 
qui contient plusieurs jobs.

    integration-tests : 
Permet de vérifier que les tests d'intégration passent


    build-and-push-client-staging
La première étape consiste à créer une version de production de notre application.
On créé un dockerfile.production, qui ressemble à celui du dockerfile de développement, mais qui va build l'application 
au lieu de la lancer en mode dev afin de créer une image docker.
On push ensuite cette image docker sur docker Hub avec le tag staging
        
    - build-and-push-server-staging : 

C'est un peu la même démarche, on va faire tourner le compilateur typescript pour créer un dossier build en full js qui
pourra s'exécuter sur n'importe quel environnement plus rapidement. Une fois l'image docker build on la push sur le 
docker hub avec le tag staging

    - notify :

Cette étape permet de notifier un service webhook sur notre vps qui va exécuter des scripts de déploiement en fonction
de l'url appelé. Ici on va notifier le webhook update-staging qui va déclancher le script de déploiement staging.

    - Script de déploiement :

[deploy-staging.yml](../../.github/workflows/deploy-staging.yml)

Le script deploy-staging.yml exécute plusieurs actions :
- il se place à la racine du projet
- il récupère la dernière version de la branche staging
- il supprime les fichiers qui ne sont pas dans la branche staging (les .env vont restés car ils sont dans le gitignore)
- il stop les containers docker de la branche staging
- il pull les images docker qui ont le tag "staging"
- il exécute le docker-compose.staging.yml avec le fichier .env.staging 


    Le docker-compose.staging.yml 
[deploy-staging.yml](../../docker-compose.staging.yml)
- On a une base de donnée postgresql avec un volume défini explicitement pour la persistance des données.

- Un pgadmin qui va nous permettre de visualiser la base de donnée (interface graphique)

- Pour le client et le serveur on utilise des images dockerhub, qui sont des build de nos dockerfile.production.

- On rajoute un nginx qui va servir le client et le serveur, il se trouve devant le serveur et le client et va dispatcher
les requêtes en fonction de l'url.

### Deploiement continu staging

Le fonctionnement est exactement le même que pour le déploiement staging pour éviter les mauvaises surprises lors du déploiement
en production.
Les fichiers appellés ne sont pas les mêmes mais ils exécutent les mêmes fonctionnalités avec production à la place de 
staging (deploy-production.yml, docker-compose.production.yml, .env.production etc...)