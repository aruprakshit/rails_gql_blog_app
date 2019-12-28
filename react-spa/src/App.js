import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const ALL_USERS_QUERY = gql`
  {
    me {
      ownedPosts {
        body
        id

        ratings {
          category
          id
          weight
        }

        comments {
          body
          id

          ratings {
            category
            id
            weight
          }
        }
      }
    }
  }
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <UsersList />
    </ApolloProvider>
  );
}

function UsersList(params) {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  console.log(loading, error, data);

  return (
    <div>
      {error && <pre>{error.message} </pre>}
      {!error && !loading && <code>{JSON.stringify(data)}</code>}
    </div>
  );
}

export default App;
