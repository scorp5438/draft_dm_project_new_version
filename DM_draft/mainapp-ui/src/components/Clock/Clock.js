import React, { useState, useEffect } from 'react';
import './style_clock.css';

const Clock = () => {
  const [time, setTime] = useState({
    dateString: '',
    timeString: ''
  });

  useEffect(() => {
    const updateClock = () => {
      const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      const now = new Date();
      const dayOfWeek = days[now.getDay()];
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const dateString = `${dayOfWeek}, ${day}.${month}.${year}`;
      const timeString = `${hours}:${minutes}:${seconds}`;

      setTime({
        dateString,
        timeString
      });
    };

    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <div className='clock'>
      <div id="clock">
        <div id="date">{time.dateString}</div>
        <div id="time">{time.timeString}</div>
      </div>
    </div>
  );
};

export default Clock;
