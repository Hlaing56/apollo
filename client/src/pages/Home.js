import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WAGERS } from '../utils/queries';
import Wager from '../components/Wager';


const Home = () => {

  const { loading, data } = useQuery(QUERY_WAGERS);

  const wagers = data?.wagers || [];

  return (
    <main>
      <div className="flex-row justify-space-between">
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
