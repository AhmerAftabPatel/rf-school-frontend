import { API } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import HtmlDynamic from '@/base/htmlDynamic';
import Footer from '@/components/footer';
import ContactUs from '@/components/forms/conatctus';
import Volunteer from '@/components/forms/volunteer';
import Page from '@/components/page';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import React, { FC } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { tw, css } from 'twind/css';

const headerstyle = css`
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items :center;
  flex-direction :column;
  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
`;

export const getServerSideProps = async () => {
  const preload = await axios.get(`${API}/page?href=volunteer-signup`);
  //   const fetched = await preload.data.json();
  // console.log(fetched,"fetched")
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: { volunteer: preload.data },
  };
};
const Contact = ({ volunteer }) => {
  return (
    <div>
      <div>
        <NextSeo
          title="RF School - Comitted For Quality Education"
          description="RF School - Comitted For Quality Education"
        />
        <Header heading="RF SCHOOL" description="Comitted for quality education." />

        <main className={tw(headerstyle)}>
          {/* <Grid stackable> */}
          {/* <Grid.Row> */}
          {/* <Grid.Column width={10}> */}
          {/* <BaseHeading Heading={volunteer.heading} center/> */}
          <HtmlDynamic data={volunteer}/>
          <StyledCard>
            <Volunteer />
          </StyledCard>
          {/* </Grid.Column> */}
          {/* <Grid.Column width={8}></Grid.Column> */}
          {/* </Grid.Row> */}
          {/* </Grid> */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

const StyledCard = styled.div`
   {
    padding: 14px;
    margin: 14px;
    border: 5px;
    width : 900px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    // box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    // border : 2px solid grey;
    @media only screen and (max-width: 600px) {
      width: auto;
      margin : 14px 0px;
    }
  }
`;

export default Contact;
