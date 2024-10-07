var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var personalProjectRouter = require("./routes/personalProject");
var workInfoRouter = require("./routes/workInfoRouter");
var workProcessRouter = require("./routes/workProcessRouter");
var additionalInfoRouter = require("./routes/additionalInfoRouter");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const mongoURI = `mongodb+srv://ngothehieu12:12345678912345@exclusive.izqci.mongodb.net/?retryWrites=true&w=majority&appName=Exclusive/test`;
const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", personalProjectRouter);
app.use("/", workInfoRouter);
app.use("/", workProcessRouter);
app.use("/", additionalInfoRouter);

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
connectToMongo();
module.exports = app;
