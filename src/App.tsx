import React from 'react'
import { gql, useQuery } from '@apollo/client';
import worker from './mocks/browser';
import './App.css'

const GET_USERS = gql`
  query getUsers {
    users {
      __typename
      id
      name
    }
  }
`

const GET_SPECIFIC_USER = gql`
  query getSpecificUser($id: String!) {
    user(id: $id) {
      __typename
      id
      name
    }
  }
`

// start MSW, capture GraphQL requests
worker.start();
worker.printHandlers();

function App() {
  const { loading: loadingAll, error: errorAll, data: dataAll } = useQuery(GET_USERS);
  const { loading: loadingSpecific, error: errorSpecific, data: dataSpecific } = useQuery(GET_SPECIFIC_USER, {
    variables: { id: 'b' },
    /**
     * Uncomment the below to magically fix the cache bug!
     */
    // fetchPolicy: 'no-cache'
  });

  if (errorAll || errorSpecific || loadingAll || loadingSpecific) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>User B from GET_USERS: {JSON.stringify(dataAll.users[1])}</p>
        <p>User B from GET_SPECIFIC_USER: {JSON.stringify(dataSpecific ? dataSpecific : 'undefined')}</p>
      </header>
    </div>
  )
}

export default App
