import React from 'react';
import Close from 'assets/icons/close';

const Table = ({ children, keys, usedefaultTh, id }) => {
  let tbody;
  let thead;

  if (Array.isArray(children)) {
    if (children.length > 2) throw new Error('Only 2 children are allowed');
  }

  thead = Array.isArray(children)
    ? children.filter(
        (child) =>
          typeof child !== 'function' && child.type.name === 'TableHead'
      )
    : typeof children !== 'function' &&
      children.type.name === 'TableHead' &&
      children;

  tbody = Array.isArray(children)
    ? children.filter(
        (child) =>
          typeof child === 'function' || child.type.name === 'TableBody'
      )[0]
    : (typeof children === 'function' || children.type.name === 'TableBody') &&
      children;

  return (
    <table
      id={id}
      className="w-full border-collapse border border-gray-200 relative"
    >
      {(!!!thead || usedefaultTh) && (
        <thead className="hidden lg:table-header-group">
          <tr className="border border-gray-200">
            {keys.map((tkey, i) => (
              <th
                className="text-sm font-semibold py-4 px-3 pl-6 tracking-wider text-txt text-left"
                key={`table_head_${i}`}
                dangerouslySetInnerHTML={{
                  __html: tkey,
                }}
              />
            ))}
          </tr>
        </thead>
      )}
      {thead}
      {typeof tbody === 'function' ? tbody({ keys }) : tbody}
    </table>
  );
};

const TableHead = ({ keys }) => (
  <thead>
    <tr>
      {keys.map((tkey, i) => (
        <th
          key={`table_head_${i}`}
          className="text-sm font-semibold py-4 px-3 tracking-wider text-txt text-left"
        >
          {tkey}
        </th>
      ))}
    </tr>
  </thead>
);

const TableBody = ({ keys, children }) => {
  return (
    <tbody>
      {children.map((child) =>
        React.cloneElement(child, { ...child.props, keys: keys })
      )}
    </tbody>
  );
};

const Trow = ({ values, keys, attr = {} }) => {
  return (
    <tr
      className={
        'block py-7 text-center lg:text-left border-collapse border-b border-gray-200 lg:table-row lg-py-0 relative'
      }
    >
      {keys.map((key, i) => (
        <td
          key={`table_rows_xx_${i}`}
          {...attr}
          className={`lg:py-7 lg:pl-6 block lg:table-cell ${
            key === 'image' ? ' lg:first:w-28' : ''
          }`}
        >
          {values[key]}
        </td>
      ))}
    </tr>
  );
};

const CloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="block lg:w-12 lg:h-12 text-center lg:border-2 border-gray-200 text-txt-fade hover:text-tomato hover:border-tomato transistion-all duration-300 flex-center absolute lg:static top-1 right-1 text-2xl"
    >
      <Close className="fill-current text-inherit" />
    </button>
  );
};

export default {
  Table,
  Head: TableHead,
  Body: TableBody,
  Trow,
  CloseButton,
};
