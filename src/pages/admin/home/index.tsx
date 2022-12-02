import React, { FC, useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
interface IProps {}

/**
 * @author
 * @function @AdminHome
 **/

const AdminHome = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  return (
    <div>
      <Accordion fluid styled>
        <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
          <Icon name="dropdown" />
          Home Banners
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
            guest in many households across the world.
          </p>
        </Accordion.Content>
        <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
          <Icon name="dropdown" />
          Home welcome message
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
            guest in many households across the world.
          </p>
        </Accordion.Content>
      </Accordion>
    </div>
  );
};




export default AdminHome;
