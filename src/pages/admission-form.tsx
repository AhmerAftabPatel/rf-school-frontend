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
import Admission from '@/components/forms/admission';

const headerstyle = css`
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items :center;
  flex-direction :column;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

export const getServerSideProps = async () => {
  const preload = await axios.get(`${API}/page?href=admission-form`);
  //   const fetched = await preload.data.json();
  // console.log(fetched,"fetched")
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: { admission: preload.data },
  };
};
const Contact = ({ admission }) => {
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
          <HtmlDynamic data={admission} center/>
          <StyledCard>
            <Admission />
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
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

export default Contact;