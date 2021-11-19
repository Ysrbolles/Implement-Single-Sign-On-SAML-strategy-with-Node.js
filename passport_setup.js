
const passport = require('passport');
const fs = require('fs')
var saml = require('passport-saml');

passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((id, done) => {
   done(null, id);
  });

const samlStrategy = new saml.Strategy(
    {
        callbackUrl: "/login-idp/callback",
        entryPoint: "https://login.microsoftonline.com/86976bfe-0c39-4288-ac34-c3951d0faa22/saml2",
        issuer: "Leafunder-ofppt",
        cert: fs.readFileSync("./certs/leafunder-ofppt.pem", "utf8"),
        // more settings might be needed by the Identity Provider
    },
        function(req, profile, done) {
            console.log("---------------------------------------");
            console.log(profile);
        done(null, profile);
    }
);

passport.use("samlStrategy", samlStrategy);