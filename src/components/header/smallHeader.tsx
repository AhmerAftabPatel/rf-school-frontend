import { tw, css } from 'twind/css';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect } from 'react';
import { API, s3_url } from '@/../constants';
// ..

const headerStyle = css`
  background-color: #ffffff;
  background-image: url('/images/schoolasset.png');
  background-size: cover;
  display: flex;
  background-attachment: fixed;
  background-position: center;
  border: 10px solid white;
  background-repeat: no-repeat;
  width: 100%;
  min-height: calc(100vh - 26rem);
`;
// background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url('/images/schoolasset.png');
const header = css`
  background: transaprent;
  padding: 5px 10px;
  color: white;
  text-align: left;
  display: inline-block;
  width: fit-content;
  border-radius : 16px;
`;

const subheader = css`
  background: transaprent;
  padding: 5px;
  color: white;
  padding: 5px 10px;
  border-radius : 16px;
  text-align: left;
  max-width: fit-content;
`;
// min-height: calc(100vh - 6rem);
interface IProps {
  heading: string;
  description: string;
  banner: string;
}

const SmallHeader = ({ heading, description, banner }: IProps) => {
  useEffect(() => {
    AOS.init();
  }, []);
  console.log(banner, 'banner');
  return (
    <StyledDiv>
      <StyledHeader banner={banner}>
        <StyledDimmer>
          <div className={tw(`flex flex-col justify-center text-left lg:px-16`)}>
            <div className={tw(header)} >
              <h1
                className={tw(`font-sans font-bold text-4xl md:text-5xl lg:text-8xl text-left leading-snug text-white`)}
              >
                {heading}
              </h1>
            </div>
            <div className={tw(subheader)} >
              <div className={tw(`mx-auto`)}>
                <p className={tw(`text-white text-left text-xl lg:text-3xl`)}>{description}</p>
              </div>
            </div>
            {/* <div className={tw(`mt-10 flex justify-center items-left`)}> */}
            {/* <Button primary>Get started</Button> */}
            {/* <span className={tw(`mx-2`)}>or</span> */}
            {/* <Button>Contact us</Button> */}
            {/* </div> */}
          </div>
          {/* <div className={tw(`flex justify-center w-full`)}>
      <div className={tw(`mt-4 w-full`)}>
        <p className={tw(`font-mono uppercase text-center font-medium text-sm text-gray-600`)}>These folks get it</p>
        <div className={tw(`flex items-center justify-center mx-auto flex-wrap`)}>
          <Aws className={tw(`m-12 mb-8`)} width={120} />
          <Netlify className={tw(`m-12`)} width={140} />
          <Nike className={tw(`m-12`)} width={140} />
          <Figma className={tw(`m-12`)} width={140} />
        </div>
      </div>
    </div> */}
        </StyledDimmer>
      </StyledHeader>
    </StyledDiv>
  );
};

const StyledDimmer = styled.div`
   {
    background-color: transparent;
    background-image: linear-gradient(360deg, rgb(54 32 146 / 52%) 0%, rgb(30 19 103 / 90%) 100%);
    width: 100%;
    display: flex;
    border-radius : 16px;
    @media only screen and (max-width: 600px) {
      padding : 0;
    }
  }
`;

const StyledHeader = styled.header`
   {
    background-color: #ffffff;
    background-image: ${(props) =>
      props.banner ? `url('${s3_url + props.banner}')` : `url('/images/schoolasset.png')`};
    background-size: cover;
    display: flex;
    background-attachment: fixed;
    border: 10px solid white;
    background-repeat: no-repeat;
    width: 100%;
    border-radius : 26px;
    min-height: calc(100vh - 26rem);

    @media only screen and (max-width: 600px) {
      min-height: 200px;
      max-height: 200px;
    }
  }
`;

const StyledDiv = styled.div`
   {
    padding: 15px 30px;
    border-radius : 16px;
    overflow : hidden;
    @media only screen and (max-width: 600px) {
      padding: 0px;
    }
  }
`;
export default SmallHeader;
