import React from 'react';

const Wagers = ({ wagers, title }) => {
  if (!wagers.length) {
    return <h3>No Wagers Yet</h3>;
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
              <p>{wager.wagerAmount}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Wagers;