import React, { FC, useContext, useEffect, useState } from 'react';
import { tw, css } from 'twind/css';
import { Grid, Icon, Image, Button, Divider } from 'semantic-ui-react';
import axios from 'axios';
import { API, s3_url } from '@/../constants';
import { LinksContext } from '@/context/links/auth/LinkContext';
import SubMenu from './Submenu';
import styled from 'styled-components';
import HtmlDynamic from './htmlDynamic';
import Folder from './folder';
interface IProps {
  data: { page: string; description: string; heading: string; banner: string; folder: string; flyer: string };
}

/**
 * @author
 * @function @Section
 **/

const Section: FC<IProps> = ({ data }) => {
  return (
    <div>
      {data?.flyer ? (
        <>
          <HtmlDynamic data={data} />
          <Image centered src={`${s3_url + data.flyer}`} alt="missiong and corevalues" />
        </>
      ) : (
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={4}>
              <div className={tw('my-2 text-blue-500')}>
                {data?.banner && <Image centered src={`${s3_url + data?.banner}`} alt="missiong and corevalues" />}
              </div>
              <br />
            </Grid.Column>
            <Grid.Column width={12}>
              <Icon color="blue" name="arrow left" onClick={() => history.back()} />
              <HtmlDynamic data={data} />
              {data?.flyer && <Image centered src={`${s3_url + data?.flyer}`} alt="missiong and corevalues" />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
      <Divider />
      {data && data?.folder && (
        <>
          {/* <br />
          <br />
          <br />
          <br /> */}
          <Folder id={data.folder} />
          <br />
        </>
      )}
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

export default Section;
