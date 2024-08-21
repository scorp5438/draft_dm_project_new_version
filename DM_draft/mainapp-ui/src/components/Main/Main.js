import React from "react";
import Image from '../Image/Image';
import background_main from '../../img/background_main.png';
import Header from '../Header/Header';
import Statistics from '../Statistics/Statistics';


function Main() {
  return (
    <div className="main-container">
      <Image background={background_main} alt="background_main" className="background_main" />
      <Header />
      <div className="content-container">
        <div className="statistics-container">
          <Statistics />
        </div>

      </div>
    </div>
  );
}

export default Main;
