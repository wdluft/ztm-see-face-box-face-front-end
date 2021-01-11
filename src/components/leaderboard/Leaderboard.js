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
      <h1>Leaderboard</h1>
      <div className="pa3 pa5-ns">
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Name - </dt>
          <dd className="dib ml0 gray">Entries</dd>
        </dl>
        {leaders.map((leader) => (
          <dl className="f6 lh-title mv2">
            <dt className="dib b">{leader.name} - </dt>
            <dd className="dib ml0 gray">&nbsp;{leader.entries}</dd>
          </dl>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
