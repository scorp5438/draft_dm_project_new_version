import React from "react";
import Image from '../Image/Image';
import test from '../../img/test.svg';
import checklist from '../../img/checklist.svg';
import image from '../../img/image.png';
import './style_header.css';

function Header() {
  return (
    <div className="container_img">
      <div className="background" />
      <div className="header-container">
        <div className="header-logo">
         <a>
          <Image image={image} alt="Logo" className="logo" />
        </a>
         </div>
        <div className="header-navigation">
          <div className="header-nav-item">
            <button className="header-nav-button" title="Раздел по тестированию">
              <Image image={test} alt="test" /></button>
          </div>
          <div className="header-nav-item">
            <button className="header-nav-button" title="Раздел по чек-листам">
              <Image image={checklist} alt="checklist" /> </button>
          </div>
          <div className="header-nav-item">
            <button className="header-nav-button" title="Ваш личный кабинет">
              <h2>Дмитрий Иванов</h2> </button>
          </div>
        </div>
      </div>
</div>
  );
}

export default Header;
