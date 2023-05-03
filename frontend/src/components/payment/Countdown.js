import { useState, useEffect } from 'react';

function Countdown() {
  const [countdown, setCountdown] = useState(null);
  // Get tomorrow's date
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(today.getHours());

  useEffect(() => {
    // Set the countdown interval to update every second
    let interval = setInterval(() => {
      // Calculate the remaining time until tomorrow's date
      let now = new Date();
      let differenceInMs = tomorrow.getTime() - now.getTime();
      let differenceInSeconds = Math.floor(differenceInMs / 1000);

      // Update the countdown display
      setCountdown(differenceInSeconds);
    }, 1000);

    // Clear the countdown interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Format the countdown display as HH:MM:SS
  let hours = Math.floor(countdown / 3600);
  let minutes = Math.floor((countdown % 3600) / 60);
  let seconds = countdown % 60;
  let display = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  const now = new Date();

  return (
    <div>
      <h1>{display}</h1>
      <p>hours left for the payment</p>
    </div>
  );
}

export default Countdown;