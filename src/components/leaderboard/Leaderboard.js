import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  const getLeaderboard = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/leaderboard`)
      .then((res) => res.json())
      .then((data) => {
        setLeaders(data.users);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <div>
      <h1 className="f1">Leaderboard</h1>
      <div className="pa3 pa5-ns pt0-ns">
        {leaders.map((leader, i) => (
          <dl className="f4 lh-title mv2" key={leader.id}>
            <dt className="dib b">
              {`${i + 1}. `}
              {leader.name} -{' '}
            </dt>
            <dd className="dib ml0 b">&nbsp;{leader.entries}</dd>
          </dl>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
