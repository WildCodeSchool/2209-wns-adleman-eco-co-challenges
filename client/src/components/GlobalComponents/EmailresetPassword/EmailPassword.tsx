import { gql, useMutation } from "@apollo/client";

import Logo from "../Logo/Logo";
import toast from "react-hot-toast";
import { useState } from "react";

const SEND_PASSWORD_MUTATION = gql`
  mutation Mutation($data: UserSendPassword!) {
    sendPasswordEmail(data: $data) {
      email
    }
  }
`;

export default function PasswordReset() {
  const [email, setEmail] = useState({
    email: "",
  });

  const [sendPasswordEmail] = useMutation(SEND_PASSWORD_MUTATION);
  return (
    <div className="AuthForm">
      <div className="body">
        <div className="logoForm">
          <Logo />
        </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendPasswordEmail({ variables: { data: email } })
                  .then(() => {
                    console.log("ok");
                  })
                  .catch(console.error);
              }}
            >
              <p>
                Saissiez votre email. Vous y recevrez un lien permettant de
                modifier votre mot de passe.
              </p>
              <label htmlFor="email">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email.email}
                  onChange={(e) => setEmail({ email: e.target.value })}
                ></input>
              </label>
              <div>
                <button
                  type="submit"
                  onClick={() => toast("please check your email")}
                >
                  Valider
                </button>
              </div>
            </form>
          </div>
        </div>
  );
}
