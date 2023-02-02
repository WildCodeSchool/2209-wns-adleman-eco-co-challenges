import AuthForm from "../components/AuthForm/AuthForm";
import Logo from "../components/Logo/Logo";

export default function Authentification() {
  return (
    <div id="login-page" className="">
      <div id="logo" className="">
        <Logo />
      </div>
      <AuthForm />
    </div>
  );
}
