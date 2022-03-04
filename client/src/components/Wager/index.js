import React from 'react';

const Wagers = ({ wagers, title }) => {
  if (!wagers.length) {
    return <h3>No Wagers Yet</h3>;
  }

  function getRandomInt() {
    return Math.floor(Math.random() * 20);
  }

  
  return (
    <div>
      <h3>{title}</h3>
      {wagers &&
        wagers.map(wager => (
          <div key={wager._id} className="card mb-3">
            <p className="card-header">
              {wager.username} wager at {wager.createdAt}
            </p>
            <div className="card-body">
              <p>amount:{wager.wagerAmount}|</p> 
              {/* <button onClick={getRandomInt()}>Roll</button> */}
              House: {getRandomInt()} | You: {getRandomInt()} 
            </div>
          </div>
        ))}
    </div>
  );
};

export default Wagers;