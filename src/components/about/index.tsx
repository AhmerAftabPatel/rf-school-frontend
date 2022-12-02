import React, { FC, useRef, useState } from 'react';
import { SideMenu } from '../../base/SideMenu';
import { tw, css } from 'twind/css';
import { Segment } from 'semantic-ui-react';
import { messages } from '../../../strings/homestrings';
interface IProps {}

/**
 * @author
 * @function @AboutInfo
 **/
const menus = [
  { name: messages.vice_chairman.label, desc: messages.vice_chairman.message },
  { name: messages.director.label, desc: messages.director.message },
  { name: messages.principal.label, desc: messages.principal.message },
];
export const AboutInfo: FC<IProps> = (props) => {
  const [activeItem, setActiveItem] = useState(messages.vice_chairman.label);
  const message = useRef(messages.vice_chairman.message)
  const handleMenuChange = (name: string,desc :string) => {
    setActiveItem(name);
    message.current = desc
  };

  const headerStyle = css`
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    border: 10px solid white;
    align-items: center;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/schoolasset.png');
    height: 200px;
  `;

  return (
    <div className={tw('flex flex-col sm:flex-col lg:flex-row')}>
      <div className={tw('flex items-center justify-center lg:flex-none h-full')}>
        <SideMenu activeItem={activeItem} menus={menus} handleItemClick={handleMenuChange} />
      </div>
      <div className={tw('w-full min-h-full ml-5')} data-aos={'fade-right'}>
        <Segment basic style={{ minHeight: '500px', padding: 0, margin: 0 }}>
          <div className={tw(headerStyle)}>
            <h1 className={tw('text-2xl font-bold text-white')}>{activeItem}</h1>
          </div>
          <div className={tw('text-xl p-4')}>
            <p>
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for
              previewing layouts and visual mockups.
            </p>
            <p>{message.current}</p>
          </div>
        </Segment>
      </div>
    </div>
  );
};
