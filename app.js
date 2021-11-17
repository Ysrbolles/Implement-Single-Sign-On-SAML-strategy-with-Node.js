const express = require('express')
const port = process.env.PORT || 1337
const chalk = require('chalk');
const passport = require('passport')
var saml = require('passport-saml');
const fs = require('fs')
var session = require('express-session');
// const passpoort_setup = require('./passport_setup')
const app = express()


passport.serializeUser(function (user, done) {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user);
});


// passport.use("samlStrategy", new saml.Strategy(
//     {
//         callbackUrl: "/login-idp/callback",
//         entryPoint: "https://login.microsoftonline.com/86976bfe-0c39-4288-ac34-c3951d0faa22/saml2",
//         issuer: "Leafunder-ofppt",
//         disableRequestAcsUrl: true,
//         validateInResponseTo: false,
//         disableRequestedAuthnContext: true,
//         cert: fs.readFileSync("./certs/leafunder-ofppt.pem", "utf8"),
//         // identifierFormat: null
//         // more settings might be needed by the Identity Provider
//     },
//     function (req, profile, done) {
//         console.log("---------------------------------------");
//         console.log(profile);
//         done(null, profile);
//     }
// ));

passport.use("samlStrategy", new saml.Strategy(
    {
        path: '/login-idp/callback',
        entryPoint: "https://login.microsoftonline.com/86976bfe-0c39-4288-ac34-c3951d0faa22/saml2",
        issuer: "Leafunder-ofppt",
        cert: fs.readFileSync("./certs/leafunder-ofppt.pem", "utf8"),
        disableRequestedAuthnContext: true,
        // identifierFormat: "Leaf"
    },
    function (profile, done) {
        console.log(profile);
    })
);
app.get('/metadata',
    function (req, res) {
        res.type('application/xml');
        res.status(200).send(
            saml.Strategy.generateServiceProviderMetadata(
                fs.readFileSync(__dirname + '/certs/leafunder-ofppt.pem', 'utf8'),
                fs.readFileSync(__dirname + '/certs/leafunder-ofppt.pem', 'utf8')
            )
        );
    }
);
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize({}));
app.use(passport.session({}));
app.get('/login-idp', function (req, res, next) {
    console.log('-----------------------------');
    console.log('/Start login handler');
    next();
},
    passport.authenticate('samlStrategy'))

app.post('/login-idp/callback',
    function (req, res, next) {
        console.log('-----------------------------');
        console.log('/Start login callback ');
        next();
    },
    passport.authenticate('samlStrategy'),
    function (req, res) {
        console.log('-----------------------------');
        console.log('login call back dumps');
        console.log(req.user);
        console.log('-----------------------------');
        res.send('Log in Callback Success');
    }
);


app.listen(port, () => {
    console.log(chalk`{blueBright SAML} API is up on port: ${port}`)
})