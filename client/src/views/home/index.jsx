import * as React from 'react';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import AppContext from 'src/context';
import { getUser, getUserAccount } from 'src/api/user';

const monthTable = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function dateMath(year, month) {
  return year * 100 + month;
}

function getMostRecentMonth(account = []) {
  return account.reduce((accum, data) => {
    return dateMath(accum.year, accum.month) >
      dateMath(data.year, data.month)
      ? accum
      : data;
  });
}

function getTotalSavings(account = []) {
  return (
    Math.trunc(
      account.reduce((accum, data) => {
        return accum + data.savings;
      }, 0) * 100,
    ) / 100
  );
}

export default function Home() {
  const { session } = React.useContext(AppContext);
  const { sessionID, userID } = session;
  const [accountDataQuery, setAccountDataQueryState] = React.useState(
    'ready',
  );
  const [, setUser] = React.useState();
  const [account, setAccount] = React.useState();
  const [, setErrorText] = React.useState('');
  const [fields, setFields] = React.useState({
    totalSavings: 0,
    currentMonth: {},
  });

  React.useEffect(() => {
    if (accountDataQuery === 'ready') {
      setAccountDataQueryState('running');
      Promise.all([
        getUser(sessionID, userID),
        getUserAccount(sessionID, userID),
      ]).then(([user, accounts]) => {
        setAccountDataQueryState('done');
        if (user.ok && accounts.ok) {
          setUser(user.data);
          setAccount(accounts.data);
        } else {
          setErrorText('Something went wrong!');
          // eslint-disable-next-line no-console
          console.warn(user, accounts);
        }
      });
    }
  }, [
    accountDataQuery,
    sessionID,
    userID,
    setErrorText,
    setAccount,
    setUser,
  ]);

  React.useEffect(() => {
    if (account && account.length) {
      const currentMonth = getMostRecentMonth(account);
      const totalSavings = getTotalSavings(account);
      console.log(currentMonth, totalSavings);
      setFields({ totalSavings, currentMonth });
    }
  }, [account, setFields]);

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Card
                style={{
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#53a93f',
                }}
              >
                <CardHeader title="This Month's Savings" />
                <CardContent>
                  <Typography
                    variant="h3"
                    style={{
                      fontWeight: '600',
                    }}
                  >
                    ${fields.currentMonth.savings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                style={{
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#53a93f',
                }}
              >
                <CardHeader title="All Time Savings" />
                <CardContent>
                  <Typography
                    variant="h3"
                    style={{
                      fontWeight: '600',
                    }}
                  >
                    ${fields.totalSavings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Bill</TableCell>
                  <TableCell align="right">Savings</TableCell>
                  <TableCell align="right">kWH</TableCell>
                  <TableCell align="center">Month</TableCell>
                  <TableCell align="center">Year</TableCell>
                </TableRow>
              </TableHead>
              {account ? (
                <TableBody>
                  {account.map(
                    ({ year, month, kwh, bill, savings }) => (
                      <TableRow key={`${year}_${month}`}>
                        <TableCell align="right">${bill}</TableCell>
                        <TableCell
                          align="right"
                          style={{ fontWeight: '600' }}
                        >
                          ${savings}
                        </TableCell>
                        <TableCell align="right">{kwh}</TableCell>
                        <TableCell align="center">
                          {monthTable[month - 1]}
                        </TableCell>
                        <TableCell align="center">{year}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              ) : (
                ''
              )}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}
