import React from 'react';

function Image({ image, background, background_main, test, checklist, person, plus }) {
  return (
    <>
      {image && <img src={image} alt="Logo" className="logo" />}
      {background && <img src={background} alt="background" className="background" />}
      {background_main && <img src={background_main} alt="background_main" className="background_main" />}
      {test && <img src={test} alt="test" className="test" />}
      {checklist && <img src={checklist} alt="checklist" className="checklist" />}
      {person && <img src={person} alt="person" className="person" />}
      {plus && <img src={plus} alt="plus" className="plus" />}
    </>
  );
}

export default Image;