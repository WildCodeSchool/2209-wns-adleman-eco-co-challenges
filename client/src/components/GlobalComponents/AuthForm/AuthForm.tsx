import "./AuthForm.css";

import {
  useCreateUserMutation,
  useGetProfileLazyQuery,
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../../../gql/generated/schema";

import Logo from "../Logo/Logo";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthForm = () => {
  const [userInfos, setUserInfo] = useState({ nickName: "", password: "", email: ""});
  const [passwordError, setPasswordError] = useState(false);
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    nickName: "",
    password: "",
  });
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();

  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  const { data: currentUser, client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });
  const [getProfile] = useGetProfileLazyQuery({
    errorPolicy: "ignore",
  });

  signUpButton?.addEventListener("click", () => {
    container?.classList.add("right-panel-active");
  });

  signInButton?.addEventListener("click", () => {
    container?.classList.remove("right-panel-active");
  });

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (!userInfos.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      return setPasswordError(true);
    }

    try {
      await createUser({ variables: { data: userInfos } });
      await login({ variables: { data: userInfos } });
      await client.resetStore();
      const res = await getProfile();
      navigate(`/user/${res?.data?.profile.id}`);
    } catch (err: any) {
      if (err.message === "EMAIL_ALREADY_EXISTS") {
        toast.error("This email is already taken");
      }
    }
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    try {
      await login({ variables: { data: credentials } });
      await client.resetStore();
      const res = await getProfile();
      navigate(`/user/${res?.data?.profile.id}`);
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = async () => {
    await logout();
    await client.resetStore();
  };

  return (
    <div className="AuthForm">
      <div className="body">
        <div className="logoForm">
          <Logo />
        </div>

        {/* VOICI LE FORMULAIRE DE CREATION USER */}

        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <input
                type="text"
                value={userInfos.nickName}
                placeholder="Pseudo"
                onChange={(e) =>
                  setUserInfo({ ...userInfos, nickName: e.target.value })
                }
              />
                            <input
                type="text"
                value={userInfos.email}
                placeholder="Email"
                onChange={(e) =>
                  setUserInfo({ ...userInfos, email: e.target.value })
                }
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
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
            {/* VOICI LE FORMULAIRE DE CONNEXION AVEC TERNAIRE VERIFICATION USER CONNECTE OU PAS */}

            {currentUser ? (
              <div className="logoutButton">
                <div data-testid="logged-in-message">
                  Logged in as {currentUser.profile.nickName}
                </div>

                <button onClick={handleLogout} className="mt-4">
                  Log out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignIn}>
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
            )}

            {/* VOICI LE SWITCH DE PAGE ENTRE CONNEXION ET CREATION */}
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
