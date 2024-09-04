import React from 'react';
import { TimePicker } from 'react-time-picker';

const allowedHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const allowedMinutes = [0, 30];

const CustomTimePicker = () => {
  const [time, setTime] = React.useState('09:00');

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const formatTime = (time) => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    if (allowedHours.includes(hour) && allowedMinutes.includes(minute)) {
      return time.toLocaleTimeString();
    } else {
      return null;
    }
  };

  return (
    <TimePicker
      onChange={handleTimeChange}
      value={time}
      format={formatTime}
      hour={allowedHours}
      minute={allowedMinutes}
    />
  );
};

export default CustomTimePicker;