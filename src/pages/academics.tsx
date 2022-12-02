import { NextSeo } from 'next-seo';
import Page from '@/components/page';
import Header from '@/components/header';
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
import VisionAndMission from '@/components/feature-section/visionMission';
import { AcademicsInfo } from '@/components/academics/academicinfo';
import { Intro } from '@/components/academics/intro';
import {tw,css} from 'twind/css'
import SmallHeader from '@/components/header/smallHeader';
import { API } from '@/../constants';
import axios from 'axios';
const headerstyle = css`
 padding : 20px 50px;

 @media only screen and (max-width: 600px) {
     padding : 0;
 }
`

export const getServerSideProps = async () => {
  const preload = await axios.get(`${API}/pages?page=Curriculum`);
  const preload1 = await axios.get(`${API}/page?href=academics`);
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      curriculum : preload.data,
      academics : preload1.data
    },
  };
};

export default function Academics({curriculum,academics}) {
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <SmallHeader heading="Academics" description="..." banner={curriculum[0].banner}/>
      <main className={tw(headerstyle)}>
        <Intro description={academics.description} heading={"Curriculum"}/>
        <AcademicsInfo type='notgereral' curriculum={curriculum}/>
      </main>
      <Footer />
    </div>
  );
}
