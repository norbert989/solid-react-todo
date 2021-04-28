import {
  login,
} from "@inrupt/solid-client-authn-browser";

function loginToInruptDotCom() {
  return login({
    oidcIssuer: "https://broker.pod.inrupt.com",

    redirectUrl: window.location.href,
  });
}

export default loginToInruptDotCom;
