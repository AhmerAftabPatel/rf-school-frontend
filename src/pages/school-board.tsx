import { API } from '@/../constants';
import HtmlDynamic from '@/base/htmlDynamic';
import { Intro } from '@/components/academics/intro';
import FacultyList from '@/components/faculty/facultylist';
import FeatureSection from '@/components/feature-section';
import Footer from '@/components/footer';
import Header from '@/components/header';
import SmallHeader from '@/components/header/smallHeader';
import Page from '@/components/page';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import React, { FC } from 'react';
import styled from 'styled-components'
interface IProps {}

/**
 * @author
 * @function @Facilities
 **/
 const Headerstyle = styled.div`
 {
  padding: 20px 70px;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
}
`;

export const getServerSideProps = async () => {
  const preload = await axios.get(`${API}/page?href=school-board`);
  console.log(preload);
  //   const fetched = await preload.data.json();
  // console.log(fetched,"fetched")
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      school_board: preload.data,
    },
  };
};
const SchoolBoard: FC<IProps> = ({school_board} : any) => {
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <SmallHeader heading={school_board.page} description={"Some thing about school board"} banner={school_board.banner}/>
      <Headerstyle>
        <HtmlDynamic data={school_board} />
        <br/>
        <hr/>
        <FacultyList edit={false} board/>
      </Headerstyle>
      <Footer />
    </div>
  );
};

export default SchoolBoard;
