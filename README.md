# useraccounts
This project is a client-server demo application. There is no DB component in this demo yet. It is purely and in-memory application.

## Client
A small SPA exposing a login screen and a dashboard.

### Login
The login view first checks the server to see if a session cookie is present. The cookie contains a session identifer 
that is matched back to an in-memory table of user sessions. If no cookie or matching session is found, then the application
shows the Login control. If a cookie and session is found, the server returns the session and user ID values and allows 
the user to proceed.

The Login form requires a username and password. There is a single hard-coded user/password combination.
The login button is disabled until the user populates the two fields. Then the user can click on the login button which 
results in a POST API
