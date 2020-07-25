import React from 'react';
import { Flex, Segment, FlexItem, Text } from '@fluentui/react-northstar';

import 'isomorphic-fetch';
import { Client } from '@microsoft/microsoft-graph-client';
import { UserAgentApplication } from 'msal';

import { ImplicitMSALAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider';
import { MSALAuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/src/MSALAuthenticationProviderOptions';

import ChatList from './chat/chat-list';

// An Optional options for initializing the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#configuration-options
const msalConfig = {
  auth: {
    clientId: '...', // Client Id of the registered application
    redirectUri: 'http://localhost:3000/',
  },
};
const graphScopes = ['user.read', 'mail.send']; // An array of graph scopes

// Important Note: This library implements loginPopup and acquireTokenPopup flow, remember this while initializing the msal
// Initialize the MSAL @see https://github.com/AzureAD/microsoft-authentication-library-for-js#1-instantiate-the-useragentapplication
const msalApplication = new UserAgentApplication(msalConfig);
const options = new MSALAuthenticationProviderOptions(graphScopes);
const authProvider = new ImplicitMSALAuthenticationProvider(
  msalApplication,
  options
);

const client = Client.initWithMiddleware({ authProvider });

client
  .api('/me')
  .get()
  .then((userDetails) => console.log(userDetails))
  .catch((e) => console.error(e));

const App = () => {
  return (
    <Flex column styles={{ height: '100vh' }}>
      <Segment color="brand" inverted>
        <Text as="h2">MS Teams Graph API Example</Text>
      </Segment>
      <FlexItem grow={1}>
        <Flex gap="gap.small" vAlign="stretch">
          <FlexItem size="300px">
            <Segment>
              <ChatList />
            </Segment>
          </FlexItem>
          <FlexItem grow={1}>
            <Segment>Main</Segment>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
};

export default App;
