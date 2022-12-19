import React, { FC, useContext, useEffect, useState } from 'react';
import { tw, css } from 'twind/css';
import { Grid, Icon, Image, Button } from 'semantic-ui-react';
import axios from 'axios';
import { API } from '@/../constants';
import { LinksContext } from '@/context/links/auth/LinkContext';
import SubMenu from './Submenu';
import Aos from 'aos';
import styled from 'styled-components';


/**
 * @author
 * @function @Section
 **/

const sizes = {
  small: '4',
  large: '5',
  tiny : '2'
};

const BaseHeading = ({ Heading, size = 'large', center=false }) => {
  return (
    <div style={center ? { display: 'flex', flexDirection: 'column', alignItems: 'center' } : {}}>
      <h1 className={tw(`text-${sizes[size]}xl text-blue-900`)} data-aos="fade-in">
        {Heading}
      </h1>
      <div className={tw(`h-2 w-20 bg-green-600 my-6`)} />
    </div>
  );
};

const StyledButtons = styled.div`
   {
    display: flex;
    jusify-content: center;
    align-items: center;
    margin-top: 12px;
  }
`;

export default BaseHeading;
