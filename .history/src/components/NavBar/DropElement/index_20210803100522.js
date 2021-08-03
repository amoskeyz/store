import Link from 'next/link';
import React from 'react';
// import './style.scss';

const DropElement = ({ menus, className = '' }) => {
  return (
    <ul
      className={`sub-menu flex flex-wrap py-8 px-8 ${className}`}
      style={{ maxWidth: menus.length > 2 ? '' : '300px', width: '90vw' }}
    >
      {menus.map((link_group) => {
        return (
          <li
            key={`${link_group}_${new Date().getMilliseconds() *
              Math.random()}`}
            className="sub-menu-title whitespace-nowrap text-sm px-8 border-r border-txt-lt"
          >
            <Link href={link_group.link}>
              <a className="mb-3.5 inline-block text-txt font-medium">
                {link_group.title}
              </a>
            </Link>

            <ul>
              {link_group.types.map((inner) => (
                <li
                  key={`${inner.title}_${new Date().getMilliseconds() *
                    Math.random()}`}
                >
                  <Link href={inner.link}>
                    <a className="text-txt-fade mb-2.5 inline-block text-sm hover:text-txt">
                      {inner.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default DropElement;
