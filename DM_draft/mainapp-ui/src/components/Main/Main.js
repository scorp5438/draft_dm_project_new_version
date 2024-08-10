import React from "react";
import Image from '../Image/Image';
import background_main from '../../img/background_main.png';
import Header from '../Header/Header'

function Main() {
  return (
    <div className="container_img">
    <div>
    <Image background={background_main} alt="background_main" className="background_main" />
    </div>
      <Header />
    </div>
  );
}

export default Main;