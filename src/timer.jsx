import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(10 * 60); // 10 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      clearInterval(timer);
      alert("Time's up!");
    }

    return () => clearInterval(timer); // Cleanup on component unmount or when timer stops
  }, [isRunning, time]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(10 * 60); // Reset to initial time
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>{formatTime(time)}</div>
      <button onClick={startTimer} disabled={isRunning}>Start</button>
      <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
