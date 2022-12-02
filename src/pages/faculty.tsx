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
const sections = [
  { key: 'Faculty', content: 'Faculty', link: true },
  { key: 'Link1', content: 'Link1', link: true },
];


export default function Faculty() {


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
          <FacultyList edit={false} board={false}/>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
