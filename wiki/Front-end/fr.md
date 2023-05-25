[🇫🇷 Retour au sommaire](../../Readme.md) - [🇬🇧 Back to summary](../Index/en.md)

⚠️ This section is wip ⚠️

# AuthForm

Deux fonction sont présente dans le composant `AuthForm`:

CreateUser: permet de créer un utilisateur

LoginUser: permet de connecter un utilisateur

## CreateUser

```js
<div className="container" id="container">
          <div className="form-container sign-up-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  !userInfos.password.match(
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
                  )
                )
                  return setPasswordError(true);

                createUser({ variables: { data: userInfos } })
                  .then(async () => {
                    await login({ variables: { data: userInfos } });
                    await client.resetStore();
                  })
                  .catch((err: { message: string }) => {
                    if (err.message === "EMAIL_ALREADY_EXISTS")
                      toast.error("This email is already taken");
                  });
              }}
            >
              <h1>Create Account</h1>
              <input
                type="text"
                value={userInfos.nickName}
                onChange={(e) =>
                  setUserInfo({ ...userInfos, nickName: e.target.value })
                }
              />
              <input
                type="password"
                id="password"
                name="password"
                minLength={8}
                value={userInfos.password}
                onChange={(e) => {
                  setUserInfo({ ...userInfos, password: e.target.value });
                  setPasswordError(false);
                }}
              />
              {passwordError && (
                <div className="password-error">
                  The password must contain at least 8 caracters and include an
                  uppercase letter and a number
                </div>
              )}
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
```

Dans cette première partie du formulaire nous invitons l'utilisateur à renseigner son pseudo et son mot de passe. Nous avons mis en place une vérification du mot de passe afin de s'assurer que celui-ci contient au moins 8 caractères, une majuscule et un chiffre.

```js
              if (
                  !userInfos.password.match(
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
                  )
                )
```

une fois que l'utilisateur a renseigné ses informations, nous allons les envoyer au serveur grâce à la fonction `useCreateuserMutation()` qui nous vient de `graphql` et qui est définie grace à codegen dans le fichier schema.ts et importé dans notre composant comme suis pour devenir createUser:

```js
const [createUser] = useCreateUserMutation();
```

Le User va enregistrer ces informations dans la base de donnée via le bouton `Sign Up` et la fonction `onSubmit` du formulaire.

```js
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  !userInfos.password.match(
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
                  )
                )
                  return setPasswordError(true);

                createUser({ variables: { data: userInfos } })
                  .then(async () => {
                    await login({ variables: { data: userInfos } });
                    await client.resetStore();
                  })
                  .catch((err: { message: string }) => {
                    if (err.message === "EMAIL_ALREADY_EXISTS")
                      toast.error("This email is already taken");
                  });
              }}
            >
```

Une fois réalisé l'utilisateur est enregistré dans la base de donnée et connecté automatiquement.

## LoginUser

La seconde partie de notre formulaire concerne la connection en elle-meme:

```js
<form
  onSubmit={(e) => {
    e.preventDefault();
    login({ variables: { data: credentials } })
      .then(client.resetStore)
      .then(() => {
        getProfile().then((res) => {
          navigate(`/user/${res?.data?.profile.id}`);
        });
      })
      .catch(() => toast.error("Invalid credentials"));
  }}
>
  <h1>Sign in</h1>
  <span>or use your account</span>
  <input
    data-testid="login-login"
    type="text"
    value={credentials.nickName}
    onChange={(e) =>
      setCredentials({ ...credentials, nickName: e.target.value })
    }
  />
  <input
    data-testid="login-password"
    type="password"
    placeholder="Password"
    value={credentials.password}
    onChange={(e) =>
      setCredentials({ ...credentials, password: e.target.value })
    }
  />
  <button type="submit">Login</button>
</form>
```

Dans ce formulaire l'utilisateur va rentrer un login et un mot de passe. Une fois ces informations renseignées, nous allons les envoyer au serveur grâce à la fonction `useLoginMutation()` qui nous vient de `graphql` et qui est définie grace à codegen dans le fichier schema.ts et importé dans notre composant comme suis pour devenir login:

```js
const [login] = useLoginMutation();
```

Cette fonction va donc vérifier si les crédentials rentré par l'utilisateur sont conforme à celle qui sont enregistré dans la base de donnée. Si c'est le cas, l'utilisateur est connecté et redirigé vers son profil. Sinon, un message d'erreur apparait.

```js
               onSubmit={(e) => {
                  e.preventDefault();
                  login({ variables: { data: credentials } })
                    .then(client.resetStore)
                    .then(() => {
                      getProfile().then((res) => {
                          navigate(`/user/${res?.data?.profile.id}`);
                })})
                    .catch(() => toast.error("Invalid credentials"))
                }}
```

## ProtectedRoute

Le composant `ProtectedRoute` permet de protéger une route. Il est utilisé dans le fichier `App.tsx` pour protéger les routes qu'il encapsule comme dans l'exemple suivant avec la page friends:

```js
<Route
  path="/friends"
  element={
    <ProtectedRoute>
      <Friends />
    </ProtectedRoute>
  }
/>
```

Le composant ProtectedRoute fonctionne facilement puisqu'il récupère les information du profil connecté grâce au cache d'Apollo qui les contient suite à la connexion de l'utilisateur. Si le profil est présent, la route est accessible, sinon l'utilisateur est redirigé vers la page de login.

```js
const { data: user, loading: loader } = useGetProfileQuery({
  errorPolicy: "ignore",
});

if (loader) {
  return <LoadingSpinner />;  const { data: user, loading: loader} = useGetProfileQuery({
    errorPolicy: "ignore",
  });

if(loader){
  return <LoadingSpinner/>
}

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;

```

Nous avons ajouter un loader pour que l'utilisateur ne voit pas la page se charger avant d'être redirigé vers la page de login et que la protection des routes ne s'active pas par inadvertance si le cache n'est pas encore chargé.


# Codegen

Codegen est un outil qui permet de générer du code à partir d'une représentation intermédiaire (IR) définie dans un langage de programmation particulier. Il peut être utilisé dans un projet React pour générer automatiquement du code. 

Etapes à suivre : 
  - Installer Codegen en tant que dépendance de développement du projet
      npm install --save-dev @graphql-codegen/cli

  - Créer un fichier codegen.yml pour configurer Codegen à la racine du projet. Ce fichier contient les informations nécessaires pour générer le code, telles que le chemin vers le schéma GraphQL et les modèles à utiliser pour la génération de code. 

  - Afin de générer automatiquement des fonction qui réalisent des requêtes graphQL de CRUD, on crée ces requêtes via l'interface graphique d'Appolo server, avant de les coller dans un fichier au ein du dosser gql. Exemple du fichier createEvent.gql:

  ```
mutation EventCreate($data: EventInput!) {
  createEvent(data: $data) {
    id
    name
    image
    participants {
      nickName
    }
    startDate
    endDate
  }
}
  ```

  - Exécuter Codegen à partir du terminal en utilisant la commande suivante : 
      npx graphql-codegen ou dans notre cas npm run codegen (cf. package.json)

  - Le code généré peut ainsi être utilisé.
  Dans l'exemple précédent, on utilisera, après l'avoir importée du fichier schema.ts la fonction suivante :
```
const [createEvent] = useCreateEventMutation();
```
  