const express = require("express");
const session = require("express-session");
const path = require("path");
const router = require("./routes");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.role = req.session.role;
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`PROYEKIN listening on port ${port}`);
});
