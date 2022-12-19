import { NextSeo } from 'next-seo';
import Header from '@/components/header';
import FeatureSection from '@/components/feature-section';
import Footer from '@/components/footer';
import Announcement from '@/components/announcement';
import ToolsSection from '@/components/ToolsSection';
import InfoSection from '@/components/feature-section/infosection';
import VisionAndMission from '@/components/feature-section/visionMission';
import styled from 'styled-components';
import Curriculam from '@/components/academics/curriculam';
import axios from 'axios';
import { API } from '@/../constants';


const Headerstyle = styled.div`
   {
    padding: 20px 50px;

    @media only screen and (max-width: 600px) {
      padding: 0px;
    }
  }
`;

export const getServerSideProps = async () => {
  const preload = await axios.get(`${API}/home`);
  //   const fetched = await preload.data.json();
  // console.log(fetched,"fetched")
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: preload.data,
  };
};
export default function Home({ welcome, message,newsandevents ,curriculum,facilities,missionandvision,announcement,parentsandstudents}) {
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <Header page="Home" />
      <Headerstyle>
        {announcement && announcement.toggle && <Announcement announcement={announcement}/>}
        <ToolsSection />
        <InfoSection welcome={welcome} message={message} newsandevents={newsandevents} parentsandstudents={parentsandstudents}/>
        <VisionAndMission missionandvision={missionandvision}/>
        {/* <VideoSection /> */}
        {/* <ListSection /> */}
        <Curriculam curriculum={curriculum}/>
        <FeatureSection facilities={facilities}/>
        {/* <ContactUs /> */}
        {/* <CasesSection /> */}
        {/* <SocialProof /> */}
        {/* <PricingTable /> */}
      </Headerstyle>
      <Footer />
    </div>
  );
}
