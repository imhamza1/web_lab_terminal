var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var productsRouter = require("./routes/products");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var mongoose = require("mongoose");
var session = require("express-session");
var sessionAuth = require("./middleware/sessionAuth");
var app = express();
app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 10000000 },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.set("trust proxy", 1); // trust first proxy

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionAuth);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

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
mongoose
  .connect(
    "mongodb://hamza:hamza123@cluster0-shard-00-00.hvxvx.mongodb.net:27017,cluster0-shard-00-01.hvxvx.mongodb.net:27017,cluster0-shard-00-02.hvxvx.mongodb.net:27017/web_terminal?ssl=true&replicaSet=atlas-cdz5ak-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
module.exports = app;
