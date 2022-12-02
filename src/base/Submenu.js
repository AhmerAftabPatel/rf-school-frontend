import React from 'react';
import { Icon } from 'semantic-ui-react';
import { tw } from 'twind';
import Link from 'next/link'
/**
 * @author
 * @function SubMenu
 **/

const SubMenu = ({ menus }) => {
  return (
    <div className={tw('my-2 text-blue-500')}>
      <ul>
        {menus.map((menu, index) => {
          return (
            <Link href={menu.href}>
              <li className={tw('hover:ml-2 hover:text-blue-400 mb-3')}>
                <Icon size="large" name="caret right" />{' '}
                <span className={tw('text-lg font-bold cursor-pointer text-uppercase')}>{menu.label}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SubMenu;
