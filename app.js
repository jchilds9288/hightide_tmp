const  createError = require('http-errors'),
       express = require('express'),
       path = require('path'),
       cookieParser = require('cookie-parser'),
       logger = require('morgan'),
       bodyParser = require("body-parser"),
       mongoose = require("mongoose"),
       routes = require("./routes"),
       port = process.env.PORT || 3001,
       app = express(),
       passport = require("passport")

// Define middleware here
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser
app.use(routes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + ' public/index.html'))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/hightidedb", { useNewUrlParser: true }, console.log("mongoose good"));

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});

module.exports = app;
