import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Image = ({ className, lazyLoad = false, alt, src }) => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: '100px 50px 50px 50px',
  });

  useEffect(() => {
    if (lazyLoad) {
      if (inView) {
        setSrc(src);
      }
    } else {
      setSrc(src);
    }
  }, [src, inView, lazyLoad]);

  const [mnsrc, setSrc] = useState(null);
  const [loading, setLoading] = useState();

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setSrc(`https://ik.imagekit.io/gk81krdud/404Image.jpeg?tr=w-600,h-800`);
  };

  return (
    <>
      <div
        className={`w-full h-full absolute top-0 left-0 ${
          loading ? 'opacity-100' : 'opacity-0'
        } transition-all delay-200`}
      >
        <div className="animate-pulse flex-col w-full h-full">
          <div className="rounded-lg bg-gray-200 h-full w-full" />
        </div>
      </div>

      <img
        ref={ref}
        className={className}
        alt={alt}
        src={mnsrc}
        onLoad={handleLoad}
        onLoadStart={handleLoadStart}
        onError={handleError}
      />
    </>
  );
};

export default React.memo(Image);
