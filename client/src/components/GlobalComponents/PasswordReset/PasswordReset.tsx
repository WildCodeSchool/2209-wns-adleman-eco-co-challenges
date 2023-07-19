import {
  useChangePasswordMutation,
  useFetchTokenQuery,
} from "../../../gql/generated/schema";
import { useNavigate, useParams } from "react-router-dom";

import Logo from "../Logo/Logo";
import toast from "react-hot-toast";
import { useState } from "react";

export default function PasswordReset() {
  const [serverToken, setServerToken] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => setShowPassword(!showPassword);
  const backToLogin = () => navigate("/login");

  const { token, id } = useParams();

  //create clean string form of id
  const cleanId = id?.replace(/[:]+/g, "") ?? "0";

  const [credentials, setCredentials] = useState({
    id: id ?? "",
    newPassword: "",
  });

  useFetchTokenQuery({
    variables: { fetchTokenId: +cleanId },
    onCompleted: (response) => {
      setServerToken(JSON.stringify(response.fetchToken.changePasswordToken));
    },
  });

  const [changePassword] = useChangePasswordMutation();

  const cleanServerToken = JSON.stringify(serverToken)
    .replace(/[\\]/g, "")
    .replace(/['"]+/g, "");
  const cleanToken = token?.replace(/[:]+/g, "");

  if (!token || cleanToken !== cleanServerToken)
    return (
      <div>
        <p>OOOPPS le lien n'est plus disponible</p>
      </div>
    );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    changePassword({
      variables: {
        newPassword: credentials.newPassword,
        changePasswordId: +credentials.id,
      },
    })
      .then(() => {
        console.log("success");
        toast.success("Votre Mot de passe a bien été modifié.", {
          duration: 5000,
        });
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        toast.error("OOOPPS une erreur est survenue.", {
          duration: 5000,
        });
      });
  };

  return (
    <div className="AuthForm">
      <div className="body">
        <div className="logoForm">
          <Logo />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPassword">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Nouveau mot de passe"
              value={credentials.newPassword}
              onChange={(e) =>
                setCredentials({
                  id: cleanId ?? "",
                  newPassword: e.target.value,
                })
              }
            ></input>
            <button type="button" onClick={togglePassword}>
              {showPassword ? "Hide password" : "Show password"}
            </button>
          </label>
          <div>
            <button type="button" onClick={backToLogin}>
              Retour
            </button>
            <button type="submit">Valider</button>
          </div>
        </form>
      </div>
    </div>
  );
}
