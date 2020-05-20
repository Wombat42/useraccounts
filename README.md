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


## Server
A simple Express server with minimal example API implementations. It can serve up content form the `./public` folder.
Warning: This has minimal, and some bad, security. Use it for reference and definitely do not use it in production.

### API
All API are have the word "api" in the url.
All non-session API must have an "Authorization" header with the session ID.

* GET `/api/session` - Checks for a session cookie and maps it back to a valid session object. If successful, it returns the session 
with a 200 status. Otherwise it returns a 401 error status.
* POST `/api/session` - Requires a payload of `{"username":<some username>, "password":<some password>}`. Returns a 200 with a session object if successful. Otherwise returns a 401 with minimal error information.
* GET `/api/user/:userid` - Gets a user's profile information. There is only one user in the system. The call should be GET `/api/user/22` to return him. The system does not check if the current user is authorized to view the data.
* Get `/api/user/:userid/account` - Returns the user's account information.

### Building the server
There is no build step

### Running the server
Run `npm start` from the server folder.



