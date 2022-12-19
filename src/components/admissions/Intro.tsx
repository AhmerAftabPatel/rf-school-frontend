import HtmlDynamic from '@/base/htmlDynamic';
import React, { FC } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { tw } from 'twind';
import styled from 'styled-components'
import {admissions_office} from  "../../../strings/admissionsstring"
import { s3_url } from '@/../constants';
interface IProps {
  admissions : { page: string; description: string; heading: string; banner: string }
}

/**
 * @author
 * @function @IntroAdmissions
 **/

const IntroAdmissions: FC<IProps> = ({admissions}) => {
  return (
    <>
      <div style={{position : "relative"}}>
        {/* <h1 className={tw('text-4xl font-bold my-4')}>{Admission}</h1> */}
        {/* <h2 className={tw('text-4xl my-4')}>Welcome from the Admission Office </h2> */}
              <div>
                <div className={tw('my-2 text-xl')}>
                  <HtmlDynamic data={admissions}/>
                  {/* {admissions_office.map((admit,index) => {
                    return <div><p key={index}>{admit}</p><br/></div>
                  })}
                  Begin your journey here! Apply Online. */}
                </div>
              </div>

              <StyledDiv className={tw('my-4 flex text-blue-800')}>
                {/* <div className={tw('h-full w-0.5 bg-gray-200')} /> */}
                
                <List link size="large" celled>
                  <StyledList as="a" href={`${s3_url + 'banners/admissions-enrollment-form.pdf'}`}>Download Application</StyledList>
                  <StyledList as="a" href="/admission-form">Online Application</StyledList>
                  <StyledList as="a" href="/rules-and-regulations">Rules and Regulations</StyledList>
                  <StyledList as="a" href="/school-fee">School Fee</StyledList>
                </List>
              </StyledDiv>
      </div>
    </>
  );
};

const StyledList = styled(List.Item)`&&&&&{
  color : blue;
  display : flex;
  cursor : pointer;
  :hover{
    color : red
  }
}`

const StyledDiv = styled.div`{
  position : absolute;
  top : -10px;
  right : 100px;
  @media only screen and (max-width: 600px) {
    position : relative;
    margin-left : 30px;
    diplay : flex;
    align-items : center;
    justify-content :center;
  }
}`

export default IntroAdmissions;
