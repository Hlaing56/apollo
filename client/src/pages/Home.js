import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WAGERS } from '../utils/queries';
import Wager from '../components/Wager';
import WagerForm from '../components/WagerForm';
import Auth from '../utils/auth';


const Home = () => {

  const { loading, data } = useQuery(QUERY_WAGERS);

  const wagers = data?.wagers || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-box justify-space-between">
      {loggedIn && (
        <div className="col-12 mb-3">
          <WagerForm />
        </div>
      )}
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Wager wagers={wagers} title="Wagers" />
          )}
        </div>
      </div>
    </main>
  );
};


export default Home;
