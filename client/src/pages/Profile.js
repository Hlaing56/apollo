import React from 'react';
import Auth from '../utils/auth';

import { Redirect, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Wager from '../components/Wager';
import WagerForm from '../components/WagerForm';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark p-3 display-inline-block border">
          Total coins left : {user.coins}
        </h2>
      </div>

      <div className="mb-3">{!userParam && <WagerForm />}</div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <Wager wagers={user.wagers} title={`your past wagers`} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
