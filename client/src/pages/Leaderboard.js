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
        <div id="countdown" class="countdown">
            <div class="time">
                <h2 id="days">00</h2>
                <small>Days</small>
            </div>
            <div class="time">
                <h2 id="hours">00</h2>
                <small>Hours</small>
            </div>
            <div class="time">
                <h2 id="minutes">00</h2>
                <small>Minutes</small>
            </div>
            <div class="time">
                <h2 id="seconds">00</h2>
                <small>Seconds</small>
            </div>
        </div>
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