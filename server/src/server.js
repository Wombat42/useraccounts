/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

// [START app]
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { getUser, getAccount } = require(path.join(__dirname, "/data"));

const app = express();

console.log(typeof getUser);

function convertToNumber(val) {
  if (val) {
    if (typeof val === "string") {
      return parseInt(val, 10);
    } else if (typeof val === "number") {
      return val;
    }
  }
  throw new TypeError(`Cannot convert ${typeof val} to number`);
}

const sessions = new Map();

function sessionManager() {
  setInterval(() => {
    console.log("starting session cleanup");
    const currentTime = Date.now();
    sessions.forEach((value, key, map) => {
      const { ttl } = value;
      if (currentTime > ttl) {
        console.log("removing session", key, map.delete(key));
      }
    });
    console.log(`finished session cleanup: ${sessions.size} active sessions`);
  }, 60 * 1000);
}

function getMaxSessionTime() {
  return 60 * 1000 * 20; //twenty minute session timeout
}

function getTTL() {
  return Date.now() + getMaxSessionTime();
}

function createSessionToken(name) {
  const token = Date.now();
  sessions.set(token, { ttl: getTTL() });
  return token;
}

function getSessionInfo(token) {
  if (!token) {
    console.log("token invalid");
    return null;
  }
  const sessionID = convertToNumber(token);
  console.log("found token", sessionID);
  return sessions.get(sessionID);
}

function hasValidSession(sessionToken) {
  console.log("sessiontoken", sessionToken);
  if (sessionToken) {
    const session = getSessionInfo(sessionToken);
    if (session) {
      const { ttl } = session;
      if (Date.now() < ttl) {
        updateSession(sessionToken);
        return true;
      }
    }
  }
  return false;
}

function updateSession(token) {
  const sessionID = convertToNumber(token);
  console.log(`updating session ${token}`);
  sessions.set(sessionID, { ttl: getTTL() });
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello from App Engine!");
});

app.use(
  cookieSession({
    name: "session",
    maxAge: getMaxSessionTime(),
    keys: ["demo"],
  })
);

app.all("/api/*", bodyParser.json(), (req, res, next) => {
  console.log(req.method, req.url, req.body, req.get("content-type"));
  if (req.url === "/api/session") {
    // User is trying to login
    next();
  } else {
    const sessionToken = req.get("authorization");
    if (hasValidSession(sessionToken)) {
      next();
      return;
    }
    res.status(401).send({ error: "not authorized" });
  }
});

app.get("/api/user/:userID", (req, res) => {
  let { userID } = req.params;
  userID = convertToNumber(userID);
  const user = getUser(userID);
  res.json(user);
});

app.get("/api/user/:userID/account", (req, res) => {
  let { userID } = req.params;
  userID = convertToNumber(userID);
  const account = getAccount(userID);
  if (account === null) {
    res.status(404).send({ error: "no account for user" }); // no account data
  } else {
    res.json(account);
  }
});

app.get("/api/session", (req, res) => {
  if (req.session) {
    const sessionToken = req.session.id;
    if (hasValidSession(sessionToken)) {
      res.send(JSON.stringify({ session: sessionToken, id: 22 }));
      return;
    }
  }
  res.status(401).send({ error: "not authorized" });
});

app.post("/api/session", (req, res) => {
  const { user = "", password = "" } = req.body;
  console.log("session", user, password);
  if (user === "ash" && password === "password") {
    const sessionToken = createSessionToken(user);
    req.session.id = sessionToken;
    res.send(JSON.stringify({ session: sessionToken, id: 22 }));
    return;
  }
  res.status(401).send({ error: "not authorized" });
});

app.delete("/api/session/:sessionID", (req, res) => {
  const { sessionID } = req.params;
  res.send("/session/:sessionid");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

sessionManager();
// [END app]

module.exports = app;
