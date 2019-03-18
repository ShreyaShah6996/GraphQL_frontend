import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/Book/BookList';
// import AuthorList from './components/Author/AuthorList';

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <br />
          <br />
          <BookList />
          {/* <hr /> */}
          {/* <AuthorList /> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
