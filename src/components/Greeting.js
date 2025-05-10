import React from 'react';

const Greeting = () => {
  const hour = new Date().getHours();
  let greeting = '';

  if (hour >= 5 && hour < 12) greeting = 'Good Morning';
  else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon';
  else if (hour >= 17 && hour < 21) greeting = 'Good Evening';
  else greeting = 'Good Night';

  return <h1>{greeting}!</h1>;
};

export default Greeting;
