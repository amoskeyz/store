import React, { useRef } from 'react';
import './style.scss';

const RevielDrop = ({
  header,
  children,
  open = false,
  revielType = 'click',
  className = '',
  containerClassName = '',
  openClassName = '',
  closeOthers = false,
  style = {},
  runOnOpen = () => {},
  runOnClose = () => {},
}) => {
  const mainRef = useRef();
  const headRef = useRef();

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    function showAllParents(e) {
      const newparent = e?.target?.parentElement || e?.parentElement;

      // if the element or the parent is drop-open return true
      if (newparent?.className.includes('drop-open')) return true;

      // if the parent or element is the parent close
      if (newparent?.className.includes('drop-rev')) return false;

      if (newparent) {
        return showAllParents(newparent);
      }
    }

    const fromChild = showAllParents(e);
    if (fromChild) return;

    if (closeOthers) {
      // don't close parents
      const elements = document.querySelectorAll('.rx-header ');

      elements.forEach((element) => {
        if (headRef.current.children[0] === element) return;
        element.classList.remove('active');

        element.nextElementSibling.classList.remove('open');
        openClassName &&
          element.nextElementSibling.classList.remove(openClassName);
      });
    }

    headRef.current.children[0].classList.toggle('active');
    mainRef.current.classList.toggle('open');
    openClassName && mainRef.current.classList.toggle(openClassName);

    if (e.target.classList.contains('active')) runOnOpen();
    else runOnClose();
  }

  const openDrop = (e) => {
    // e.target.classList.add("active");
    mainRef.current.classList.add('open');
    openClassName && mainRef.current.classList.add(openClassName);
  };

  const close = (e) => {
    // e.target.classList.remove("remove");
    mainRef.current.classList.remove('open');
    openClassName && mainRef.current.classList.remove(openClassName);
  };

  const functionToUse =
    revielType === 'click'
      ? {
          onClick: handleClick,
        }
      : {
          onMouseOver: openDrop,
          onMouseLeave: close,
        };

  return (
    <div
      className={`drop-rev ${containerClassName}`}
      ref={headRef}
      {...functionToUse}
    >
      {header &&
        React.cloneElement(header, {
          className: `rx-header ${header.props.className}`,
        })}

      <div
        ref={mainRef}
        style={style}
        className={`${className}${
          revielType === 'click' ? ' click-type' : ''
        } drop-open${open ? ' open' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default RevielDrop;
