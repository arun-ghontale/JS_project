var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");
const connectMongo = require("connect-mongo");
const MongoDBStore = connectMongo(session);
const bcypt = require("bcrypt");
/*
The equivalent of above would be:
const MongoDBStore = require("connect-mongo")(session);
*/

var User = require("./models/User");
var Post = require("./models/Post");
var Comment = require("./models/Comment");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 27017;
const ONE_WEEK = 60 * 24 * 7 * 60 * 1000;

mongoose.connect(
  `mongodb://${HOST}:${PORT}/facebook`,
  function (err) {
    if (!err) {
      console.log("Successfully connected to the DB");
    } else {
      console.log("Problem connecting to DB");
    }
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var signupRouter = require("./routes/signup");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: ONE_WEEK
    },
    store: new MongoDBStore({
      mongooseConnection: mongoose.connection
    })
  })
);


/*
passport.js stuff goes here
The below passport is configured in the ./config/passport.js
*/
passport.authenticate('local');

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
/*can use "if (req.isAuthenticated())" instead of "if (req.user)" */
app.use("/users", function (req, res, next) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login")

}, usersRouter);
app.use("/auth", authRouter);
app.use("/signup", signupRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;