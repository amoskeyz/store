import { useState, forwardRef, useImperativeHandle } from 'react';
import ColorBg from 'components/ColorBg';
import Close from 'assets/icons/close';
import './style.scss';

const Layout = forwardRef(({ aside, children, type = '' }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(!open);
    },
    close: () => {
      setOpen(false);
    },
  }));

  return (
    <div className="main-layout flex-row al-start">
      <aside className={`layout-aside ${type}${open ? ' open' : ''}`}>
        <div className="layout-aside__contents">
          <button className="close-btn" onClick={() => setOpen(!open)}>
            <Close />
          </button>
          <ColorBg oneSide={true} />
          {aside}
        </div>
      </aside>
      <main className="layout-main">
        <div className="layout-main__con">{children}</div>
      </main>
    </div>
  );
});

export default Layout;
