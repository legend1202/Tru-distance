// eslint-disable-next-line import/no-extraneous-dependencies
import { PublicClientApplication } from '@azure/msal-browser';

const MSAL_CONFIG = {
  auth: {
    clientId: '0d48aea4-d11f-4aab-919d-090539a1231c',
    // authority: "https://login.microsoftonline.com/Vlad.onmicrosoft.com",
    authority: 'https://login.microsoftonline.com/df45050a-8160-4eba-9902-7fd2acbbd81b', // Replace with your Directory (tenant) ID
    redirectUri: 'http://localhost:8000',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const LOGIN_REQUEST = {
  scopes: ['openid', 'offline_access'],
};

const TOKEN_REQUEST = {
  scopes: ['User.ReadWrite.All'],
};

const GRAPH_CONFIG = {
  graphUsersEndpoint: 'https://graph.microsoft.com/v1.0/users',
};

const PUBLIC_CLIENT_APPLICATION = new PublicClientApplication(MSAL_CONFIG);
async function initializeMsal() {
  await PUBLIC_CLIENT_APPLICATION.initialize();
}
initializeMsal();

export { MSAL_CONFIG, GRAPH_CONFIG, LOGIN_REQUEST, TOKEN_REQUEST, PUBLIC_CLIENT_APPLICATION };
