import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";
import { AlertProvider } from "./state/Alert";
import { DriverProvider } from "./state/DriverContext";
import { ClientProvider } from "./state/ClientContext";
import {ApolloProvider} from "@apollo/client";
import {client} from "./api/ApiClient";

require('dotenv').config()


const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/auth0provideroptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}>
    <ApolloProvider client={client}>
    <AlertProvider>
      <DriverProvider>
        <ClientProvider>
          <App />
        </ClientProvider>
      </DriverProvider>
    </AlertProvider>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
