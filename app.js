const express = require('express')
const port = process.env.PORT || 1337
const chalk = require('chalk');
const passport = require('passport')
var saml = require('passport-saml');
const fs = require('fs')
const passpoort_setup = require('./passport_setup')
const app = express()

const samlCallback = function(passport) {
    return function(req, res, next) {
        passport.authenticate("samlStrategy", function(err, user, info) {

            const email = user.email;

            // check in database if user with that email exists
            // ...

            // if exists show content for registered users:
            req.login(user, function(err) {
                return res.redirect("/my-contents-page");
            });

            // application logic code
            // ...

            // if doesn't exist redirect to complete registration page
            req.login(user, function(err) {
                return res.redirect(
                    "/complete-registration"
                );
            });

        })(req, res, next);

    };
};

app.route("/login-idp").get(passport.authenticate("samlStrategy"));
app.route("/login-idp/callback").post(samlCallback(passport));



app.listen(port, () => {
    console.log(chalk`{blueBright SAML} API is up on port: ${port}`)
})