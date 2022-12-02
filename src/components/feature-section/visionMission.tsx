import BaseHeading from '@/base/BaseHeader';
import HtmlDynamic from '@/base/htmlDynamic';
import { Container, Grid, Image, List } from 'semantic-ui-react';
import { tw, css } from 'twind/css';
import {vision,mission} from '../../../strings/mainstring'
const AccordiionData = [
  { name: 'Students Corner' },
  { name: 'School Hand Book' },
  { name: 'School Hand Book' },
  { name: 'School Uniform' },
  { name: 'School Service' },
  { name: 'School Events' },
];

const styledDiv = css`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding : 25px 20px;
`;

const VisionAndMission = ({missionandvision}) => (
  <section className={tw(`pb-6`)}>
    <Container fluid className={tw('m-6')}>
      <div className={tw(styledDiv)}>
        <BaseHeading Heading='Vision & Mission' size='small'/>
        {/* <HtmlDynamic data={missionandvision}/> */}
        <div dangerouslySetInnerHTML={{ __html: missionandvision?.description }}></div>
        {/* <div>
          <p>
           {vision}
          </p>
          <p>
            {mission}
          </p>
        </div> */}
      </div>
    </Container>
  </section>
);

export default VisionAndMission;
