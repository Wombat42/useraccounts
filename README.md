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
