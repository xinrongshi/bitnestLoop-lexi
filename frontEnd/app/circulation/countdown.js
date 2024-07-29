import React, { useEffect, useState } from 'react';

const Countdown = ({ endTime }) => {
  const calculateTimeLeft = () => {
    if (typeof endTime !== 'number') {
      return {};
    }
    const difference = endTime - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span>
      <span style={{color:"#c29a3e"}}>{timeLeft.days || 0}</span>{"d "} 
      <span style={{color:"#cca947"}}>{timeLeft.hours || 0}</span>{"h "}  
      <span style={{color:"#cca947"}}>{timeLeft.minutes || 0}</span> {"m "} 
      <span style={{color:"#cca947"}}>{timeLeft.seconds || 0}</span> {"s "}
    </span>
  );
};

export default Countdown;
