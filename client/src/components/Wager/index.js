import React from 'react';

const Wagers = ({ wagers, title }) => {
  if (!wagers.length) {
    return <h3>No Wagers Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      <div className='flex-row'>
      {wagers &&
        wagers.map(wager => (
          <div key={wager._id} className="card mb-3">
            <p className="card-header">
              {wager.username}'s wager on {wager.createdAt}
            </p>
            <div className="card-body">
             House: {wager.house} | Amount:{wager.wagerAmount} | You: {wager.you} 
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Wagers;