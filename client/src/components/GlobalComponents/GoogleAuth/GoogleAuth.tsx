import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

import axios from "axios";

interface GoogleProfile {
  access_token: string;
}

interface GoogleAuthProps {
  onGoogleProfileChange: (profile: any) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onGoogleProfileChange }) => {
  const [googleUser, setGoogleUser] = useState<GoogleProfile | null>();

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      return setGoogleUser(codeResponse);
    },
    onError: (error?: any) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (googleUser) {
      console.log("🚀 ~ file: GoogleAuth.tsx:26 ~ useEffect ~ googleUser:", googleUser)
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res: any) => {
          onGoogleProfileChange(res.data);
        })
        .catch((err: any) => console.log(err));
    }
  }, [googleUser, onGoogleProfileChange]);

  return (
    <div>
      <button onClick={() => googleLogin()}>Sign in with Google 🚀 </button>
    </div>
  );
};
export default GoogleAuth;
