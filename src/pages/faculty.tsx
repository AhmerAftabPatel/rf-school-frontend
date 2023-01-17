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
import SmallHeader from '@/components/header/smallHeader';
import Section from '@/base/Section';
import Container from '@/base/contaner';
// import Breadcrumb from '@/base/breadcrumb';
import {Divider} from 'semantic-ui-react'
import FacultyList from '@/components/faculty/facultylist';
import BaseHeading from '@/base/BaseHeader';
import { API } from '@/../constants';
import axios from 'axios';
const sections = [
  { key: 'Faculty', content: 'Faculty', link: true },
  { key: 'Link1', content: 'Link1', link: true },
];
// `${API}/people`


export const getStaticProps = async () => {
  const preload = await axios.get(`${API}/people`);
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
      people: preload.data.people,
      heading : preload.data.heading
    },
  };
};

export default function Faculty({people, heading}) {


  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <SmallHeader heading="Faculty Information" description="Some thing about faculty" banner=''/>
      <main className="">
        <Container>
          {/* <Breadcrumb sections={sections} /> */}
          <Divider />
          {/* <BaseHeading Heading='Faculty & Staff' size='small'/> */}
          {/* <Section /> */}
          <FacultyList edit={false} board={false} people={people} heading={heading} preload={undefined}/>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
