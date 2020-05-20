/* eslint no-nested-ternary: 0 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from 'src/context';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authenticate, getSession } from 'src/api/session';

const cardStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '300px',
    margin: 'auto',
    top: '25%',
  },
}));

const progressStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    left: '50%',
    top: '45%',
  },
}));

const cardContentStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const textStyles = makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      width: '25ch',
    },
  },
}));

export default function Login(props) {
  const { session, setSession } = React.useContext(AppContext);
  const { children } = props;

  const cardClasses = cardStyles();
  const textClass = textStyles();
  const progressClasses = progressStyles();
  const cardContentClasses = cardContentStyles();

  const [authQueryState, setAuthQueryState] = React.useState('ready');
  const [sessionQueryState, setSessionQueryState] = React.useState(
    'ready',
  );
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [loginState, setLoginState] = React.useState(false);

  useEffect(() => {
    let login = false;
    if (username.length && password.length) {
      login = true;
    }
    setLoginState(login);
  }, [username, password]);

  useEffect(() => {
    if (sessionQueryState === 'ready') {
      setSessionQueryState('running');
      getSession().then((res) => {
        setSessionQueryState('done');
        if (res.ok) {
          setSession({
            sessionID: res.data.session,
            userID: res.data.id,
          });
        }
      });
    }
  }, [sessionQueryState, setSession]);

  useEffect(() => {
    if (authQueryState === 'start') {
      setAuthQueryState('running');
      authenticate(username, password).then((res) => {
        setAuthQueryState('done');
        if (res.ok) {
          setSession({
            sessionID: res.data.session,
            userID: res.data.id,
          });
        } else {
          setErrorText('Bad username or password. Please try again.');
        }
      });
    }
  }, [authQueryState, username, password, setSession]);

  const handleChange = (event) => {
    const { currentTarget } = event;
    const { id, value } = currentTarget;
    switch (id) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleLogin = () => {
    setAuthQueryState('start');
  };

  return (
    <>
      {sessionQueryState === 'running' ? (
        <CircularProgress className={progressClasses.root} />
      ) : session.sessionID ? (
        children
      ) : (
        <Card className={cardClasses.root}>
          <CardHeader title="Login" />
          {authQueryState === 'running' ? (
            <CircularProgress
              style={{ position: 'relative', left: '45%' }}
            />
          ) : (
            <>
              <CardContent className={cardContentClasses.root}>
                {errorText ? (
                  <div>
                    <Typography color="error" variant="caption">
                      {errorText}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}
                <TextField
                  required
                  id="username"
                  label="Username"
                  className={textClass.root}
                  onChange={handleChange}
                  onBlur={handleChange}
                />
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  className={textClass.root}
                  onChange={handleChange}
                  onBlur={handleChange}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: 'auto' }}
                  disabled={!loginState}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </CardActions>
            </>
          )}
        </Card>
      )}
    </>
  );
}

Login.propTypes = {
  children: PropTypes.node.isRequired,
};
