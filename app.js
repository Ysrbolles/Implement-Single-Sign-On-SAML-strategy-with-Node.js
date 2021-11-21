const port = process.env.PORT || 1337
const chalk = require('chalk');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var fs = require('fs');
const cors = require('cors');

var SamlStrategy = require('passport-saml').Strategy;
passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (user, done) {
	done(null, user);
});
passport.use(new SamlStrategy(
	{
		callbackUrl: "/login-idp/callback",
		entryPoint: "https://login.microsoftonline.com/86976bfe-0c39-4288-ac34-c3951d0faa22/saml2",
		issuer: "Leafunder-ofppt",
		cert: fs.readFileSync("./certs/leafunder-ofppt.pem", "utf8"),
		disableRequestAcsUrl: true,
		wantAssertionsSigned: false,
	},
	function (profile, done) {
		return done(null, {
			id: profile['nameID'],
			email: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
			displayName: profile['http://schemas.microsoft.com/identity/claims/displayname'],
			firstName: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
			lastName: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname']
		});
	})
);

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();


// uncomment after placing your favicon in /public

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.header('origin'));
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Credentials', 'true');

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}

	next();
});
app.use(session(
	{
		resave: true,
		saveUninitialized: true,
		secret: 'this shit hits'
	}));
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', index);
// app.use('/users', users);

app.get('/login-idp',
	passport.authenticate('saml', {
		successRedirect: '/',
		failureRedirect: '/login-idp'
	}),
	(req, res) => {
		return res.status(200).json({ user: req.user })
	}
);
app.post('/login-idp/callback',
	passport.authenticate('saml', {
		failureRedirect: '/login-idp',
		failureFlash: true
	}),
	function (req, res) {
		console.log("hhhhhh");
		res.redirect("http://localhost:3000")
	}
);

app.get("/whoiamm", (req, res) => {
	console.log("................................................................");
	console.log(req.isAuthenticated());
	if (!req.isAuthenticated())
		return res.status(401).json({ message: "sir bhalek" })
	else {
		console.log("hhhhhhhhhokhhh");
		console.log(req.user);
		return res.status(200).json({ user: req.user })
	}
})
// catch 404 and forward to error handler


// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(port, () => {
	console.log(chalk`{blueBright SAML} API is up on port: ${port}`)
})