import React, { useEffect, useRef, useState } from 'react';
import Opennav from 'assets/icons/hambuger.js';

const Open = ({ openNav, close = () => {}, text = 'Menu' }) => {
  const currentScroll = useRef();
  const navRef = useRef();
  const [slided, setSlided] = useState();

  useEffect(() => {
    let reqId;

    const scroll =
      window.requestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    const loop = () => {
      if (currentScroll.current !== window.scrollY) {
        currentScroll.current = window.scrollY;

        const navPosition = navRef.current?.getBoundingClientRect().y;

        if (currentScroll.current > 200) {
          if (navPosition < 90) {
            setSlided(true);
          }
        } else {
          setSlided(false);
        }
      }

      reqId = scroll(loop);
    };

    loop();
    window.addEventListener('scroll', close);

    return () => {
      window.removeEventListener('scroll', close);
      window.cancelAnimationFrame(reqId);
    };
  }, [currentScroll, close, top]);

  const color = slided ? 'text-white' : 'text-txt';

  return (
    <div
      className={`flex lg:hidden cursor-pointer h-7 mr-2.5 z-50 mb-5 top-24 ${
        slided ? 'fixed bg-txt' : 'static bg-white'
      }`}
      ref={navRef}
      onClick={openNav}
    >
      <div className="flex-center transition-all duration-300 p-3 rounded-sm">
        <Opennav
          className={`fill-current ${color} mr-2.5 pointer-events-none w-7`}
        />
        <p className={`${color} pointer-events-none text-md`}>{text}</p>
      </div>
    </div>
  );
};

export default Open;
