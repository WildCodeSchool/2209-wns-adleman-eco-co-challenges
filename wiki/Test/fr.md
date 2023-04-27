⚠️ This section is wip ⚠️

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