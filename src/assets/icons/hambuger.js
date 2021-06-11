import React from 'react';

const hambuger = ({ className }) => {
  return (
    <svg
      width="41"
      height="17"
      viewBox="0 0 41 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="8" y="7" width="33" height="3" rx="1.5" />
      <rect x="18" width="23" height="3" rx="1.5" />
      <path d="M0 15.5C0 14.6716 0.671573 14 1.5 14H39.5C40.3284 14 41 14.6716 41 15.5C41 16.3284 40.3284 17 39.5 17H1.5C0.671574 17 0 16.3284 0 15.5Z" />
    </svg>
  );
};

export default hambuger;
