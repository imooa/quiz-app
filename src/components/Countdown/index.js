import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label, Icon } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import { timeConverter } from '../../utils';

const Countdown = ({ countdownTime, timeOver, setTimeTaken }) => {
  const totalTime = countdownTime * 1000;
  const [timerTime, setTimerTime] = useState(totalTime);
  const { hours, minutes, seconds } = timeConverter(timerTime);

  // Calculate time progress for color changes
  const timeProgress = (totalTime - timerTime) / totalTime;
  
  // Color based on remaining time
  const getTimerColor = () => {
    if (timeProgress > 0.8) return 'red';
    if (timeProgress > 0.6) return 'orange';
    if (timeProgress > 0.4) return 'yellow';
    return 'green';
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);

        Swal.fire({
          icon: 'warning',
          title: `⏰ Time's Up!`,
          text: 'Your 20 minutes are over. Let\'s see how you did!',
          confirmButtonText: 'View Results',
          confirmButtonColor: '#2185d0',
          timer: 5000,
          showConfirmButton: true,
          allowOutsideClick: false,
          willClose: () => timeOver(totalTime - timerTime),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      setTimeTaken(totalTime - timerTime + 1000);
    };

    // eslint-disable-next-line
  }, [timerTime]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Icon name="clock outline" size="large" color={getTimerColor()} />
      <div style={{ display: 'flex', gap: '0.3rem' }}>
        <Label 
          size="large" 
          color={getTimerColor()}
          style={{ 
            fontFamily: 'monospace', 
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px'
          }}
        >
          {String(hours).padStart(2, '0')}
        </Label>
        <span style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          color: '#666',
          lineHeight: '2.2rem'
        }}>:</span>
        <Label 
          size="large" 
          color={getTimerColor()}
          style={{ 
            fontFamily: 'monospace', 
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px'
          }}
        >
          {String(minutes).padStart(2, '0')}
        </Label>
        <span style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          color: '#666',
          lineHeight: '2.2rem'
        }}>:</span>
        <Label 
          size="large" 
          color={getTimerColor()}
          style={{ 
            fontFamily: 'monospace', 
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px'
          }}
        >
          {String(seconds).padStart(2, '0')}
        </Label>
      </div>
    </div>
  );
};

Countdown.propTypes = {
  countdownTime: PropTypes.number.isRequired,
  timeOver: PropTypes.func.isRequired,
  setTimeTaken: PropTypes.func.isRequired,
};

export default Countdown;