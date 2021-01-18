import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';

function External() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const callApi = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/shows');
      const data = await response.json();

      setResponse(data);
      setError(undefined);
    } catch (error) {
      setResponse(undefined);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handle = (event, fn) => {
    event.preventDefault();
    fn();
  };

  return (
    <>
      <div className="mb-5" data-testid="external">
        <h1 data-testid="external-title">External API</h1>
        <p data-testid="external-text">
          Ping an external API by clicking the button below. This will call the external API using an access token, and
          the API will validate it using the API's audience value.
        </p>
        <Button color="primary" className="mt-5" onClick={e => handle(e, callApi)} data-testid="external-action">
          Ping API
        </Button>
      </div>
      <div className="result-block-container">
        {isLoading && <Loading />}
        {(error || response) && (
          <div className="result-block" data-testid="external-result">
            <h6 className="muted">Result</h6>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {response && <Highlight>{JSON.stringify(response, null, 2)}</Highlight>}
          </div>
        )}
      </div>
    </>
  );
}

export default withPageAuthRequired(External, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
