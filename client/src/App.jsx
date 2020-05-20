import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import UserList from 'src/views/userlist';
import { Router, Link } from '@reach/router';
import Login from './components/login';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from './context';

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>
        <UserList />
      </h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard sfdd</h2>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100vw',
      height: '100vh',
    },
  },
}));

function App() {
  const classes = useStyles();
  const [session, setSession] = React.useState(null);
  const appContext = { session, setSession };

  return (
    <AppContext.Provider value={appContext}>
      <div className={classes.root}>
        <Paper elevation={0}>
          <Login>
            <div>
              <nav>
                <Link to="/">Home</Link>{' '}
                <Link to="/about">About</Link>{' '}
              </nav>
              <Router>
                <Home path="/" />
                <UserList path="/about" />
              </Router>
            </div>
          </Login>
        </Paper>
      </div>
    </AppContext.Provider>
  );
}

export default hot(App);
