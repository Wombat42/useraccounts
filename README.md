# useraccounts
This project is a client-server demo application. There is no DB component in this demo yet. It is purely and in-memory application.

## Client
A small SPA exposing a login screen and a dashboard.

### Login
The login view first checks if a session already exists by performing a GET `/api/session` API. The server will check for a
session cookie. The cookie contains a session identifer 
that is matched back to an in-memory table of user sessions. If no cookie or matching session is found, then the application
shows the Login control. If a cookie and session is found, the server returns the session and user ID values and allows 
the user to proceed.

The Login form requires a username and password. There is a single hard-coded user/password combination.
The login button is disabled until the user populates the two fields. Then the user can click on the login button which 
results in a POST `/api/session` API call to the server with a payload of the username and password. The server will validate 
the fields and then return both a new session payload and a session cookie. The user is then forwarded to the home view.

- [ ] Need to change the username and password fields so that hitting enter will automatically validate the form and submit the login request.

### Home
The home view displays the user's current month's savings, their total savings, and a list of all their bills (with savings).

It performs two API calls. One to return the user profile, which is currently not used. The api is GET `/api/user/:userid`.
The second API returns the user's account data via GET `/api/user/:userid/account`. This returns the list of all their bills.

- [ ] The UI needs some styling... or possibly to be redesigned entirely.
- [ ] Need to add the user name to the upper left of the UI
- [ ] Need to add a logout button
- [ ] Need to add error handling incase a user got in (somehow) and could not lookup their account information.


### Third-Party Libraries
This client pulls from a number of commonly used libraries. They all have either MIT or Apache 2.0 licenses.
* React and React-DOM
* Material-UI

### Dev Tooling
* Webpack with HRM and RHL
* Eslint
* Prettier

### Building the client
Run `npm start` to start up the dev environment. This brings up just the client hosting. The dev server will proxy request to the 
server portion with is running on `http://localhost:9000`. The client server is on `http://localhost:8080`. Point your browser to
`http://localhost:8080` to work on the client. Any code change *should* be reflected immediately. You will at times need 
to refresh either the browser or the session.
