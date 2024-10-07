import React from 'react';

function Image({
  image, background, background_main, cross,
  classNames = {} // объект с классами
}) {
  return (
    <>
      {image && <img src={image} alt="Logo" className={`logo ${classNames.image || ''}`} />}
      {background && <img src={background} alt="background" className={`background ${classNames.background || ''}`} />}
      {background_main && <img src={background_main} alt="background_main" className={`background_main ${classNames.background_main || ''}`} />}
      {background_main && <img src={background_main} alt="background_main" className={`background_main ${classNames.background_main || ''}`} />}
      {cross && <img src={cross} alt="cross" className={`cross ${classNames.cross || ''}`} />}
    </>
  );
}

export default Image;
