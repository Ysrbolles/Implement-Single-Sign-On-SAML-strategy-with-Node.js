
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
        protocol: "http://",
        entryPoint: "https://student-1337leaf.okta.com/app/student-1337leaf_leaf_1/exk7bwt01bCa1xaeG696/sso/saml",
        issuer: "http://localhost:1337/",
        cert: fs.readFileSync("./certs/leafunder-ofppt.pem", "utf8"),
        // more settings might be needed by the Identity Provider
    },
    function (profile, done) {

        console.log(profile);
        done(null, profile)
    }
);

passport.use("samlStrategy", samlStrategy);