import { gql, useMutation } from "@apollo/client";

import Logo from "../Logo/Logo";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SEND_PASSWORD_MUTATION = gql`
  mutation Mutation($data: UserSendPassword!) {
    sendPasswordEmail(data: $data) {
      email
    }
  }
`;

export default function PasswordReset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    email: "",
  });

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    sendPasswordEmail({ variables: { data: email } })
      .then(() => {
        toast.success(
          "Un Email avec un lien de réinitialisation vous a été envoyé.",
          {
            duration: 5000,
          }
        );
      }).then (() => {navigate("/login");
      })
      .catch(() => {
        toast.error("une erreur est survenue", {
          duration: 5000,
        });
      });
  };

  const [sendPasswordEmail] = useMutation(SEND_PASSWORD_MUTATION);
  return (
    <div className="AuthForm">
      <div className="body">
        <div className="logoForm">
          <Logo />
        </div>
        <form onSubmit={onHandleSubmit}>
          <p>
            Saissiez votre email. Vous y recevrez un lien permettant de modifier
            votre mot de passe.
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
            <button type="submit">Valider</button>
          </div>
          <div>
            <button type="button" onClick={() => navigate("/login")} >Retour au Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
