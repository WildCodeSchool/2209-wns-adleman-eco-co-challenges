# README IS WIP

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