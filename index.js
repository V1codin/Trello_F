const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const coockieParser = require("cookie-parser");
const csrf = require("csurf");
const path = require("path");

const cors = require("./src/modules/cors");
const ignoreFavicon = require("./src/modules/ignoreFavicon");
const { getUserDocument, getUsersInfo } = require(".src/modules/Api");

const app = express();

const PORT = +process.env.PORT || config.get("serverPort");

const start = async () => {
  try {
    /*
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cors);
    app.use(bodyParser.json());
    app.use(coockieParser());
    app.use(csrf({ cookie: true }));
    ignoreFavicon(app);

    app.all("*", (req, res, next) => {
      console.log("all");
      const token = req.csrfToken();
      res.cookie("XSRF-TOKEN", token);
      next();
    });
    */

    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname, "view/error.html"));
    });

    app.listen(PORT, () => {
      /*
      const userId = "premiumAdmin";
      const additionalClaims = {
        premiumAccount: true,
      };

      db.auth()
        .createCustomToken(userId, additionalClaims)
        .then((r) => console.log(r));
    */

      console.log("Server started on port ", PORT);
    });

    /*
    app.get("/getcsrf", (req, res) => {
      const csrf = req.csrfToken();

      res.cookie("myCookie", "4444", { httpOnly: false });

      res.send("You've got a token");
    });

    app.post("/login", async (req, res) => {
      console.log("req: ", req.body);
      const idToken = req.body.userIdToken.toString();
      const csrfToken = req.body.csrfToken.toString();
      if (csrfToken !== req.cookies.csrfToken) {
        res.status(401).send("UNAUTHORIZED REQUEST!");
        return;
      }

      // res.send("hello world!");
      //const data = await getUsersInfo(req.params.id);
      //res.send(JSON.stringify(data));
      // res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });
    */
  } catch (e) {
    console.log(e);
  }
};

start();
