import { useParams } from "react-router-dom";
import { useState } from "react";

export default function PasswordReset() {

  const [serverToken, setServerToken] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const { token, id } = useParams();

  //create clean string form of id
  const cleanId = id?.replace(/[:]+/g, "") ?? "0";

  const [credentials, setCredentials] = useState({
    id: id ?? "",
    newPassword: "",
  });

  // useFetchTokenQuery({
  //   variables: { fetchTokenId: +cleanId },
  //   onCompleted: (response) => {
  //     setServerToken(JSON.stringify(response.fetchToken.changePasswordToken));
  //   },
  // });


  // const [changePassword] = useChangePasswordMutation();

  const cleanServerToken = JSON.stringify(serverToken)
    .replace(/[\\]/g, "")
    .replace(/['"]+/g, "");
  const cleanToken = token?.replace(/[:]+/g, "");

  if (!token || cleanToken !== cleanServerToken)
    return (
      <div>
        <p>OOOPPS invalid token</p>
      </div>
    );

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // changePassword({ variables: { newPassword: credentials.newPassword, changePasswordId: +credentials.id } })
            //   .then(() => {
            //     console.log("success");
            //   })
            //   .catch(console.error);
          }}
        >
          <label htmlFor="newPassword">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Nouveau mot de passe"
              value={credentials.newPassword}
              onChange={(e) =>
                setCredentials({ id: cleanId ?? "", newPassword: e.target.value })
              }
            ></input>
            <button type="button" onClick={togglePassword}>{showPassword ? "Hide password" : "Show password"}</button>
          </label>
          <div>
            <button>Retour</button>
            <button type="submit">
              Valider
            </button>
          </div>
        </form>
      </div>
    </>
  );
}