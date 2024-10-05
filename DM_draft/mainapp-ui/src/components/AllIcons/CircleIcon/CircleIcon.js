import React from 'react';

const CircleIcon = ({ width = '40px', height = '40px', fill = '#000000' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
                <title>circle</title>
                <circle cx="512" cy="512" r="256" fill="#f72a16" fillRule="evenodd" />
            </g>
        </svg>
    );
};

export default CircleIcon;
