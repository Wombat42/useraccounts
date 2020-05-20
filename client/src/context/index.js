import React from 'react';

const AppContext = React.createContext({
  session: { sessionID: null, userID: null },
  setSession: () => {},
});

export default AppContext;
