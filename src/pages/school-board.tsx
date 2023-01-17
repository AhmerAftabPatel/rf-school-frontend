import { API } from '@/../constants';
import HtmlDynamic from '@/base/htmlDynamic';
import FacultyList from '@/components/faculty/facultylist';
import Footer from '@/components/footer';
import SmallHeader from '@/components/header/smallHeader';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import React, { FC } from 'react';
import styled from 'styled-components';
interface IProps {}

/**
 * @author
 * @function @Facilities
 **/
const Headerstyle = styled.div`
   {
    padding: 20px 70px;

    @media only screen and (max-width: 600px) {
      padding: 20px;
    }
  }
`;

export const getStaticProps = async () => {
  const preload = await axios.get(`${API}/page?href=school-board`);
  const preload1 = await axios.get(`${API}/people`);
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      school_board: preload.data,
      people: preload.data.people,
      heading: preload.data.heading,
    },
  };
};
const SchoolBoard: FC<IProps> = ({ school_board, people, heading }: any) => {
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <SmallHeader
        heading={school_board.page}
        description={'Some thing about school board'}
        banner={school_board.banner}
      />
      <Headerstyle>
        <HtmlDynamic data={school_board} />
        <br />
        <hr />
        <FacultyList edit={false} board people={people} heading={heading} />
      </Headerstyle>
      <Footer />
    </div>
  );
};

export default SchoolBoard;
