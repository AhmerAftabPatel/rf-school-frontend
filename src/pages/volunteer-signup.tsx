import { API } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import HtmlDynamic from '@/base/htmlDynamic';
import Footer from '@/components/footer';
import ContactUs from '@/components/forms/conatctus';
import Volunteer from '@/components/forms/volunteer';
import Page from '@/components/page';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import React, { FC } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { tw, css } from 'twind/css';



const headerstyle = css`
  padding: 20px 50px;

  @media only screen and (max-width: 600px) {
    padding: 0;
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
    props: {volunteer : preload.data},
  };
};
const Contact = ({volunteer}) => {
  return (
    <div>
      <div>
        <NextSeo
          title="RF School - Comitted For Quality Education"
          description="RF School - Comitted For Quality Education"
        />
        <Header heading="RF SCHOOL" description="Comitted for quality education." />

        <main className={tw(headerstyle)}>
          <HtmlDynamic data={volunteer}/>
          <Volunteer />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
