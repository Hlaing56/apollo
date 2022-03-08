import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';

const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function submitCheckout() {
    getCheckout();
  }


  return (
    <header className="bg-secondary mb-4 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Apollo</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/leaderboard">Leaderboard</Link>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
              <button onClick={submitCheckout}>
                Refill
              </button>
            </>
          ) : (
            <>
              <Link to="/leaderboard">Leaderboard</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
