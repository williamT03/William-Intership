import React, { useState, useEffect } from "react";

const Timer = ({ expiryDate, itemId }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!expiryDate) return;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, expiryDate - now);
      
      if (remaining > 0) {
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      } else {
        setTimeLeft("Expired");
      }
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (!expiryDate || !timeLeft) return null;

  return (
    <div className="nft_timer">
      {timeLeft}
    </div>
  );
};

export default Timer;