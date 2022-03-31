import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import worker from './mocks/browser';
import './App.css'

const GET_SUBSITE_DOMAIN_STATUS = gql`
  query GetSubsiteDomainStatus( $id: Int! ) {
    jobs {
      type
      completedAt
      createdAt
      inProgressLock
      progress {
        status
        steps {
          name
          step
          status
        }
      }
    }
  }
`

// start MSW, capture GraphQL requests
worker.start();
worker.printHandlers();

function App() {
  const {
    loading: isLoading,
    error: hasErrors,
    data: data
  } = useQuery( GET_SUBSITE_DOMAIN_STATUS, {
		fetchPolicy: 'no-cache',
		pollInterval: 1000,
		returnPartialData: true,
    errorPolicy: 'all',
    variables: { id: 'b' },
  } );

  if ( hasErrors || isLoading ) {
    return null;
  }

  return (
    <div className="App" style={ { padding: '20px' } }>
      <pre style={ { textAlign: 'left' } }>Response: { data ? JSON.stringify( data, null, 1 ) : 'undefined' }</pre>
    </div>
  )
}

export default App
