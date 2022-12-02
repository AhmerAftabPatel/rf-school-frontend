import { tw } from 'twind';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import styled from 'styled-components';
// ..
// AOS.init();
// interface IAnnouncement{
//
const Announcement = ({ announcement }) => {
  return (
    <StyledSection className={tw('container bg-white mb-4 hidden lg:block')}>
      <div className={tw('grid grid-cols-10 h-15 border-2 border-rose-600 rounded-md')}>
        <div className={tw('bg-black-200 flex items-center justify-center bg-blue-800 text-white rounded-md px-4')}>
          &nbsp;Announcements&nbsp;<div className={tw('')}></div>
        </div>
        <div className={tw('col-span-9 bg-white flex items-center p-3 text-black')}>{announcement.text}</div>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
   {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 12px;
  }
`;

export default Announcement;
