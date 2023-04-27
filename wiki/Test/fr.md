[🇫🇷 Retour au sommaire](../../Readme.md) - [🇬🇧 Back to summary](../Index/en.md)

⚠️ This section is wip ⚠️

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

