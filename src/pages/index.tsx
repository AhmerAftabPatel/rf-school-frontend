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
import { createMedia } from '@artsy/fresnel';

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const Headerstyle = styled.div`
   {
    padding: 20px 50px;

    @media only screen and (max-width: 600px) {
      padding: 0px;
    }
  }
`;

export const getStaticProps = async () => {
  const preload = await axios.get(`${API}/home`);
  const banner = await axios.get(`${API}/banner?page=Home`);
  // console.log(banner)
  // const changes = await axios.get(`${API}/changes`);
  //   const fetched = await preload.data.json();
  // console.log(fetched,"fetched")
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data: preload.data, banner: banner.data },
    // revalidate: changes ? 10000 : false,
  };
};
export default function Home({ banner, data }) {
  const {
    welcome,
    message,
    newsandevents,
    curriculum,
    facilities,
    missionandvision,
    announcement,
    parentsandstudents,
  } = data;
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <MediaContextProvider>
        <Media greaterThan="mobile">
          <Header page="Home" banner={banner} />
          <Headerstyle>
            {announcement && announcement.toggle && <Announcement announcement={announcement} />}
            <ToolsSection />
            <InfoSection
              welcome={welcome}
              message={message}
              newsandevents={newsandevents}
              parentsandstudents={parentsandstudents}
            />
            <VisionAndMission missionandvision={missionandvision} />
            {/* <Curriculam curriculum={curriculum} /> */}
            <FeatureSection facilities={facilities} />
          </Headerstyle>
        </Media>
        <Media at="mobile">
          <Header page="Home" banner={banner} mobile/>
          <Headerstyle>
            {announcement && announcement.toggle && <Announcement announcement={announcement} />}
            <ToolsSection mobile/>
            <InfoSection
              welcome={welcome}
              message={message}
              newsandevents={newsandevents}
              parentsandstudents={parentsandstudents}
            />
            <VisionAndMission missionandvision={missionandvision} />
            <Curriculam curriculum={curriculum} mobile/>
            <FeatureSection facilities={facilities}/>
          </Headerstyle>
        </Media>
      </MediaContextProvider>

      <Footer />
    </div>
  );
}
