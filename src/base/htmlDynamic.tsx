import React, { FC, useContext, useEffect, useState } from 'react';
import { tw, css } from 'twind/css';
import { Grid, Icon, Image, Button } from 'semantic-ui-react';
import axios from 'axios';
import { API } from '@/../constants';
import { LinksContext } from '@/context/links/auth/LinkContext';
import SubMenu from './Submenu';
import styled from 'styled-components';
import BaseHeading from './BaseHeader';
interface IProps {
  data: { page: string; description: string; };
}

/**
 * @author
 * @function @Section
 **/

const HtmlDynamic: FC<IProps> = ({ data }) => {
  return (
    <div>
      {data ? (
        <div>
          <BaseHeading Heading={data?.page} size="large"/>
          <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        </div>
      ) : (
        'loading...'
      )}
    </div>
  );
};



export default HtmlDynamic;
