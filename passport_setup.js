const passport = require('passport');
const fs = require('fs')
var saml = require('passport-saml');

const samlStrategy = new saml.Strategy(
    {
        callbackUrl: "/login-idp/callback",
        entryPoint: "https://login.microsoftonline.com/86976bfe-0c39-4288-ac34-c3951d0faa22/saml2",
        issuer: "passport-saml",
        // decryptionPvk: fs.readFileSync("./certs/key.pem", "utf8"),
        // privateCert: fs.readFileSync("./certs/key.pem", "utf8"),
        cert: "MIIC8DCCAdigAwIBAgIQHdoNzsnbMb5Lv6bbe/D0+zANBgkqhkiG9w0BAQsFADA0MTIwMAYDVQQDEylNaWNyb3NvZnQgQXp1cmUgRmVkZXJhdGVkIFNTTyBDZXJ0aWZpY2F0ZTAeFw0yMTExMTIxMDMzMTdaFw0yNDExMTIxMDMzMTdaMDQxMjAwBgNVBAMTKU1pY3Jvc29mdCBBenVyZSBGZWRlcmF0ZWQgU1NPIENlcnRpZmljYXRlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxrGMw4YiyZ5uofJ93f6eHwEmqelbv5vx1O3NUjsmLFLusfSSitEzGDEvxQg+tvv6rpHdw92k/gmMjNu9XB4d2zu/DsDIn31KwtRjwJtAjXakxPL2kIxwCP9lW9HeUB6UDQxLWnfQ80FgXoEB8ikHoqXddv3+N3NHOebygkDPSGxPj+cAXudlxcUZfz3FZH0y2OMnwfN+I3tkzwnzJ6FuCxn1QLF1hJijeLPa3NOM+W333DpfvX6WOEl52tfe1BMaSq21/6uDq5b3YJA+i07V5kEKBKUzXm0bsMYOwCR6CUvJqYpYdrt1cI/iR+ZSOL8Ol/cr0sk2zav5Nn0DhECXNQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCRT6FQZxtnfp+Pe3zwtWuEQT5yrHfClRKEUAk0+jouT31OqXrLcS4iWeNTMd6zCODzPSrCdtc5nu3QLfQvJndoPk9MPCZ18LaTdiLnk6IyVZGLz1dqUfhTVyJyRH38uTNPZ9zZqP1xdY4Yncdz7czCdLP4ybmPdCuC+FaXyuzxaOJOtouIczCbLI6LmEGD9QTAbV1x50YBqo5FcO/riDmtSb5Jo9HpekK0Z6exsLbF9sNp/weuL0Jt1AmLAULQ3iGnTHAUCwYr/uVWHc2+tiRt2YZfZUV0UlkcAt9y5H6TQerlvIuNv5ckrK74n0XezWgZexmBdIeWnzqKKIgO02mu"
   
        // more settings might be needed by the Identity Provider
    },
        function(req, profile, done) {
        return done(null, profile);
    }
);

passport.use("samlStrategy", samlStrategy);