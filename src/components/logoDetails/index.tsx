import Head from 'next/head';
import { tw } from 'twind';
import {Image} from 'semantic-ui-react'
import styled from 'styled-components'
interface LogoDetailsProp {
  color: string;
  logo : string;
}
const LogoDetails = ({ color = 'blue', logo }: LogoDetailsProp) => (
  <div style ={{position : "relative"}}>
    <div className={tw(`flex items-left justify-center w-full`)}>
      <Image className={tw(`mr-4 border-0`)} style ={{height : "130px"}} src={`${logo}`} alt="logo" />
      <div className={tw(`flex flex-col items-left flex justify-center`)}>
        <h2 className={tw(`lg:text-6xl text-3xl text-${color}-900 font-bold text-bold m-0`)}>RF School</h2>
        <StyledSubheader>Committed for Quality Education</StyledSubheader>
        <StyledSmall>Recognised by the Govt. of Telangana</StyledSmall>
      </div>
    </div>
  </div>
);

const StyledSubheader = styled.span`{
  font-size : 17px;
  @media only screen and (max-width: 600px) {
    font-size : 12px;
}
}`

const StyledSmall = styled.span`{
  font-size : 13px;
  // letter-spacing : 3px;
  position : absolute;
  bottom : 2px;
  float : right;
}`
// #1e3a8a
export default LogoDetails;
