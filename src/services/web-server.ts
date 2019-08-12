import http from "http";
import express from "express";
import compression from "compression";  // compresses requests
// import session from "express-session";
import cookieSession from "cookie-session";
// import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import logger from "../util/logger";
import lusca from "lusca";
// import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import errorHandler from "errorHandler";
import cors from "cors";
// import jwt from "jwt";
// import mongoose from "mongoose";
// import passport from "passport";
// import expressValidator from "express-validator";
// import bluebird from "bluebird";
import router from "./router";
// import webServerConfig from "../config/web-server";
// import { MONGODB_URI, SESSION_SECRET } from "../util/secrets";
import localIP from "../util/local-ip";
// const MongoStore = mongo(session);

let httpServer: any;

export function initialize() {
  return new Promise((resolve, reject) => {

    // Controllers (route handlers)
    // import * as homeController from "../controllers/home";
    // import * as userController from "./controllers/user";
    // import * as apiController from "./controllers/api";
    // import * as contactController from "./controllers/contact";


    // API keys and Passport configuration
    // import * as passportConfig from "./config/passport";

    // Create Express server
    const app = express();
    httpServer = http.createServer(app);
    // // Connect to MongoDB
    // const mongoUrl = MONGODB_URI;
    // (<any>mongoose).Promise = bluebird;
    // mongoose.connect(mongoUrl).then(
    //   () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    // ).catch(err => {
    //   console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    //   // process.exit();
    // });

    // Express configuration
    // app.set("port", process.env.PORT || 8000);
    // app.set("views", path.join(__dirname, "../../views"));
    // app.set("view engine", "pug");
    // CORS middleware
    app.use(cors());
    app.options("*", cors());
    app.use(compression());
    /*
    * Error Handler. Provides full stack - remove for production
    */
    app.use(errorHandler());
    // secret variable
    app.set("superSecret", process.env.SESSION_SECRET);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(expressValidator());
    // app.use(express.cookieParser());
    // app.use(session({
    // app.use(session({
    //   resave: true,
    //   saveUninitialized: true,
    //   secret: process.env.SESSION_SECRET,
    //   // store: new MongoStore({
    //   //   url: mongoUrl,
    //   //   autoReconnect: true
    //   // })
    // }));
    app.use(cookieSession({
      name: "session",
      keys: [process.env.SESSION_SECRET],
      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }));
    // app.use(passport.initialize());
    // app.use(passport.session());
    app.use(flash());
    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
    // app.use((req, res, next) => {
    //   res.locals.user = req.user;
    //   next();
    // });
    // app.use((req, res, next) => {
    //   // After successful login, redirect back to the intended page
    //   if (!req.user &&
    //     req.path !== "/login" &&
    //     req.path !== "/signup" &&
    //     !req.path.match(/^\/auth/) &&
    //     !req.path.match(/\./)) {
    //     req.session.returnTo = req.path;
    //   } else if (req.user &&
    //     req.path == "/account") {
    //     req.session.returnTo = req.path;
    //   }
    //   next();
    // });

    app.use(
      express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
    );

    /**
     * Primary app routes.
     */
    /* GET home page. */
    app.get(process.env.BASE_URL, function (req, res, next) { // process.env.BASE_URL
      // res.render('index', { title: 'Express' });
      res.end("Server Portal api"); // , { title: "Express" } as any);
      // res.end(process.env.NODE_ENV);
    });
    // Mount the router at /api so all its routes start with /api
    app.use(`${process.env.BASE_URL}api`, router);
    // app.get("/", homeController.index);
    // app.get("/login", userController.getLogin);
    // app.post("/login", userController.postLogin);
    // app.get("/logout", userController.logout);
    // app.get("/forgot", userController.getForgot);
    // app.post("/forgot", userController.postForgot);
    // app.get("/reset/:token", userController.getReset);
    // app.post("/reset/:token", userController.postReset);
    // app.get("/signup", userController.getSignup);
    // app.post("/signup", userController.postSignup);
    // app.get("/contact", contactController.getContact);
    // app.post("/contact", contactController.postContact);
    // app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
    // app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
    // app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
    // app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
    // app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

    /**
     * API examples routes.
     */
    // app.get("/api", apiController.getApi);
    // app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

    /**
     * OAuth authentication routes. (Sign in)
     */
    // app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
    // app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
    //   res.redirect(req.session.returnTo || "/");
    // });
    process.env.PORT = process.env.PORT || "8000";
    httpServer
      .listen(process.env.PORT)
      .on("listening", () => {
        console.log(`Local listening on http://localhost:${process.env.PORT}`);
        console.log(`Server listening on http://${localIP}:${process.env.PORT}`);
        resolve();
      })
      .on("error", (err: any) => { reject(err); });
  });
}

export function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key: any, value: string) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === "string" && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}

// export default app;