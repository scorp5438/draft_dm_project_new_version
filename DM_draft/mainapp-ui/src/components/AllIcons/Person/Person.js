import React, { useState } from 'react';

const Person = (props) => {
  const [hover, setHover] = useState(false);

  const { width = '32px', height = '32px', stroke = '#0068E2', strokeWidth = '2.8', ...rest } = props;

  const strokeColor = hover ? '#ffffff' : stroke;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      fill="none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      <circle cx="32" cy="18.14" r="11.14" />
      <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" />
    </svg>
  );
};

export default Person;
