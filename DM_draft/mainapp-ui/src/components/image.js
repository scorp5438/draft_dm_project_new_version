import React from "react";

class Image extends React.Component {
  render() {
    const { image, background } = this.props;
    return (
      <>
        {image && <img src={image} alt="Logo" className="logo" />}
        {background && <img src={background} alt="background" className="background" />}

      </>
    );
  }
}

export default Image;