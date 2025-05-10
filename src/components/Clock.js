import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = time.toLocaleTimeString('en-GB');
  const formatDate = time.toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="clock">
      <h2>{formatTime}</h2>
      <p>{formatDate}</p>
    </div>
  );
};

export default Clock;
