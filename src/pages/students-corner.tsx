import { NextSeo } from 'next-seo';
import Page from '@/components/page';
import Header from '@/components/header';
import {tw} from 'twind';
import VideoSection from '@/components/video-section';
import ListSection from '@/components/list-section';
import FeatureSection from '@/components/feature-section';
// import CasesSection from '@/components/cases-section';
import SocialProof from '@/components/social-proof';
import PricingTable from '@/components/pricing-table';
import Footer from '@/components/footer';
import Announcement from '@/components/announcement';
import ToolsSection from '@/components/ToolsSection';
import InfoSection from '@/components/feature-section/infosection';
import styled from 'styled-components'
import IntroAdmissions from '@/components/admissions/Intro';
import { AcademicsInfo } from '@/components/academics/academicinfo';
import SmallHeader from '@/components/header/smallHeader';
import axios from 'axios';
import { API } from '@/../constants';
import HtmlDynamic from '@/base/htmlDynamic';
export const getServerSideProps = async () => {
  const preload = await axios.get(`${API}/page?href=students-corner`);
  const preload1 = await axios.get(`${API}/pages?page=Students Corner`);
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      admissions: preload.data,
      curriculum : preload1.data
    },
  };
};

const Headerstyle = styled.div`
{
 padding: 20px 70px;

 @media only screen and (max-width: 600px) {
   padding: 20px;
 }
}
`;

export default function Admissions({admissions,curriculum}) {
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <SmallHeader heading={admissions.page} description='Resources for Students' banner={admissions.banner}/>
      <Headerstyle>
        {/* <IntroAdmissions admissions={admissions}/> */}
        <br/>
        {/* <HtmlDynamic data={admissions}/> */}
        <AcademicsInfo type='notgeneral' curriculum={curriculum}/>
      </Headerstyle>
      <Footer />
    </div>
  );
}
