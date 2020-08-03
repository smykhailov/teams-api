import React, { PropsWithChildren } from 'react';

import 'isomorphic-fetch';
import { Client } from '@microsoft/microsoft-graph-client';
import { UserAgentApplication } from 'msal';

import { ImplicitMSALAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider';
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';

// An Optional options for initializing the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#configuration-options
const msalConfig = {
  auth: {
    clientId: '7890f911-1560-403b-9656-5b2d5e6f5119', // Client Id of the registered application
    redirectUri: 'http://localhost:3000/',
  },
};
const graphScopes = ['User.Read', 'Chat.Read', 'Chat.ReadWrite']; // An array of graph scopes

// Important Note: This library implements loginPopup and acquireTokenPopup flow, remember this while initializing the msal
// Initialize the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js#1-instantiate-the-useragentapplication
const msalApplication = new UserAgentApplication(msalConfig);
const options = new MSALAuthenticationProviderOptions(graphScopes);
const authProvider = new ImplicitMSALAuthenticationProvider(
  msalApplication,
  options
);

const graphClient = Client.initWithMiddleware({ authProvider });

type TAppContextProps = {
  client: Client;
};

const AppContext = React.createContext<TAppContextProps>({
  client: graphClient,
});

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = (
  props: PropsWithChildren<Partial<TAppContextProps>>
) => {
  const [client, setClient] = React.useState(graphClient);
  const providerValue = {
    client,
  };

  React.useEffect(() => {
    if (props.client) {
      setClient(props.client);
    }
  }, [props.client]);

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
};
