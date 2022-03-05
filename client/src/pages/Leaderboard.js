import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import Board from '../components/Board';

const Leaderboard = () => {

  const { loading, data } = useQuery(QUERY_USERS);

  const users = data?.users || [];


  return (
    <main>
      <div className="flex-box justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Board users={users} title="Board" />
          )}
        </div>
      </div>
    </main>
  );
};


export default Leaderboard;