import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MAKE_WAGER } from '../../utils/mutations';
import { QUERY_WAGERS, QUERY_ME } from '../../utils/queries';

const WagerForm = () => {

  const [wagerAmount, setAmount] = useState('');

  const [makeWager, { error }] = useMutation(MAKE_WAGER, {
    update(cache, { data: { makeWager } }) {
      try {
        const { wagers } = cache.readQuery({ query: QUERY_WAGERS });
        cache.writeQuery({
          query: QUERY_WAGERS,
          data: { wagers: [makeWager, ...wagers] }
        });
      } catch (e) {
        console.error(e);
      }
  
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, wagers: [...me.wagers, makeWager] } }
      });
    }
  });

  const handleChange = event => {
      setAmount(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await makeWager({
        variables: { wagerAmount } 
      });

      setAmount("0");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className="m-0">
        Feeling Lucky?
      </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
      <label for="quantity">Betting Amount:</label>
        <input 
        type="Number" min="5" 
        value={wagerAmount} onChange={handleChange}>
        </input>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WagerForm;