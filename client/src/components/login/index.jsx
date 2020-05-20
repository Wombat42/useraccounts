import React, { useEffect } from 'react';
import AppContext from 'src/context';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getSession } from 'src/api/session';

const cardStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '300px',
    margin: 'auto',
    top: '25%',
  },
}));

const cardContentStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const textStyles = makeStyles((theme) => ({
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
  const cardContentClasses = cardContentStyles();

  const [queryState, setQueryState] = React.useState('ready');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginState, setLoginState] = React.useState(false);

  useEffect(() => {
    if (username.length && password.length) {
      console.log(username.length, password.length, password);
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [username, password]);

  useEffect(() => {
    if (queryState === 'start') {
      setQueryState('running');
      console.log('making api call');
      const sessionLookup = async () => {
        getSession(username, password).then((res) => {
          setSession(res.session);
        });
      };
      sessionLookup();
    }
  }, [queryState]);

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
    }
  };

  const handleLogin = () => {
    setQueryState('start');
  };

  return (
    <>
      {session ? (
        children
      ) : (
        <Card className={cardClasses.root}>
          <CardHeader title="Login" />
          <CardContent className={cardContentClasses.root}>
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
        </Card>
      )}
    </>
  );
}
