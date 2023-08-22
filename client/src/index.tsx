import "./index.css";

import { ApolloProvider } from "@apollo/client/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import client from "./gql/client";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="547997135269-00lm190l3ip2qajjlo34fc5gkh48ogjg.apps.googleusercontent.com">
    <React.StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
