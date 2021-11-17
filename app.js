const express = require('express')
const port = process.env.PORT || 1337
const chalk = require('chalk');
const passport = require('passport')
var saml = require('passport-saml');
const fs = require('fs')
const passpoort_setup = require('./passport_setup')
const app = express()

app.use(passport.initialize())

passport.serializeUser((user, done) => {
    done(null, user);
  });
passport.deserializeUser((id, done) => {
   done(null, id);
  });



passport.use("samlStrategy", new saml.Strategy(
    {
        callbackUrl: "/login-idp/callback",
        entryPoint: "https://login.microsoftonline.com/86976bfe-0c39-4288-ac34-c3951d0faa22/saml2",
        issuer: "Leafunder-ofppt",
        // disableRequestAcsUrl: true,
        // decryptionPvk: fs.readFileSync("./certs/leafunder-ofppt.pem", "utf8"),
        // privateCert: fs.readFileSync("./certs/leafunder-ofppt.pem", "utf8"),
        cert: fs.readFileSync("./certs/leafunder-ofppt.pem", "utf8"),
        // identifierFormat: null
        // more settings might be needed by the Identity Provider
    },
        function(req, profile, done) {
            console.log("---------------------------------------");
            console.log(profile);
        done(null, profile);
    }
));

app.get('/login-idp', passport.authenticate("samlStrategy", {
    failureRedirect: '/app/failed',
    failureFlash: true
}))

app.post(
	'/login-idp/callback',
	passport.authenticate('samlStrategy', {
		failureRedirect: '/app/failed',
		failureFlash: true
	}),
	(req, res) => {
        console.log("hhhhh");
		return res.redirect('/app');
	}
);


app.listen(port, () => {
    console.log(chalk`{blueBright SAML} API is up on port: ${port}`)
})