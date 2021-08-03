import { useState } from 'react';

function Dots({ className = '', func, number }) {
  const [value, setValue] = useState(0);

  return (
    <div className={`${className} dots-container z-10 flex-wrap flex`}>
      {Array.from(Array(number).keys()).map((index) => (
        <button
          className="dot-button flex py-1.5 px-2.5"
          key={index}
          onClick={() => {
            func(index);
            setValue(index);
          }}
        >
          <span
            className="dot w-2.5 h-2.5 rounded-full border border-black bg-gray-700"
            data-active={index === value ? 'active' : null}
          />
        </button>
      ))}
    </div>
  );
}

export default Dots;
