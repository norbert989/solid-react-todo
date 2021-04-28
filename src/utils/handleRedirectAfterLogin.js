import {
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";

async function handleRedirectAfterLogin(setIsLoggedIn, setWebId) {
  await handleIncomingRedirect();
  const session = getDefaultSession();
  if (session.info.isLoggedIn) {
    let podResource = session.info.webId.split("#")
    setIsLoggedIn(true);
    setWebId(podResource[0]);
  }
}

export default handleRedirectAfterLogin;
