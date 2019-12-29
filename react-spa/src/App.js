import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PrivateRoute from './components/Utils/PrivateRoute';
import Posts from './components/Posts';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoute path='/posts' component={Posts} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
