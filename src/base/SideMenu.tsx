import React, { FC } from 'react';
import { Menu, Segment } from 'semantic-ui-react';

interface IProps {
  menus: any;
  activeItem: string;
  handleItemClick: (name: string,desc : string) => void;
  // children : React.ReactNode;
}

/**
 * @author
 * @function @SideMenu
 **/

export const SideMenu = ({ menus, activeItem, handleItemClick }: IProps) => {
  return (
    <Menu size="huge" pointing color="blue" vertical>
      {menus.map((menu, index) => {
        return <Menu.Item key={index} name={menu.name} active={activeItem === menu.name} onClick={(e) => handleItemClick(menu.name,menu.desc)} />;
      })}
      {/* <Segment>
        {children}
      </Segment> */}
    </Menu>
  );
};
