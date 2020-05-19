import React from 'react';
import UserList from 'src/views/userlist';
import { Router, Link } from '@reach/router';

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

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> <Link to="/about">About</Link>{' '}
      </nav>
      <Router>
        <Home path="/" />
        <UserList path="/about" />
      </Router>
    </div>
  );
}

export default App;
