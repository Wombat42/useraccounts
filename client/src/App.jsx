import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router } from '@reach/router';
import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Home from './views/home';
import Login from './components/login';
import AppContext from './context';

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
  const [session, setSession] = React.useState({});
  const appContext = { session, setSession };

  return (
    <AppContext.Provider value={appContext}>
      <div className={classes.root}>
        <Paper elevation={0}>
          <Login>
            <>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Home
                  </Typography>
                </Toolbar>
              </AppBar>
              <div>
                <Router>
                  <Home path="/" />
                </Router>
              </div>
            </>
          </Login>
        </Paper>
      </div>
    </AppContext.Provider>
  );
}

export default hot(App);
