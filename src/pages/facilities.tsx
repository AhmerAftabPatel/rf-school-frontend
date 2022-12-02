import { API } from '@/../constants';
import FeatureSection from '@/components/feature-section';
import Footer from '@/components/footer';
import Header from '@/components/header';
import SmallHeader from '@/components/header/smallHeader';
import Page from '@/components/page';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import React, { FC } from 'react';

interface IProps {}

/**
 * @author
 * @function @Facilities
 **/
 export const getServerSideProps = async () => {
  const preload = await axios.get(`${API}/pages?page=Facilities`);
  const preload1 = await axios.get(`${API}/page?href=facilities`);
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      facilities : preload.data,
      facility : preload1.data,
    },
  };
};
const Facilities = ({facilities,facility}) => {
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <SmallHeader heading={facility.heading} description={"School facilities"} banner={facility.banner}/>
      <main>
        <FeatureSection facilities={facilities}/>
      </main>
      <Footer />
    </div>
  );
};

export default Facilities;
