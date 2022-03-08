import React from 'react';

const Users = ({ users, title }) => {
  if (!users.length) {
    return <h3>No Users Yet</h3>;
  }

  return (
    <div>
      {users &&
        users.map(user => (
          <div key={user._id} className="cardLead mb-3">
            <div className="card-body">
              {user.username} | Coins: {user.coins} 
            </div>
          </div>
        ))}
    </div>
  );
};

export default Users;