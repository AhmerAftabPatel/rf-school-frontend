import HtmlDynamic from '@/base/htmlDynamic';
import React, { FC } from 'react';
import { Grid, List } from 'semantic-ui-react';
import { tw } from 'twind';
import styled from 'styled-components'
import {admissions_office} from  "../../../strings/admissionsstring"
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
      <div>
        {/* <h1 className={tw('text-4xl font-bold my-4')}>{Admission}</h1> */}
        {/* <h2 className={tw('text-4xl my-4')}>Welcome from the Admission Office </h2> */}
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <div>
                <div className={tw('my-2 text-xl')}>
                  <HtmlDynamic data={admissions}/>
                  {/* {admissions_office.map((admit,index) => {
                    return <div><p key={index}>{admit}</p><br/></div>
                  })}
                  Begin your journey here! Apply Online. */}
                </div>
              </div>
            </Grid.Column>

            <Grid.Column width={4}>
              <div className={tw('my-4 flex text-blue-800')}>
                {/* <div className={tw('h-full w-0.5 bg-gray-200')} /> */}
                
                <List link size="large" celled>
                  <StyledList as="a">Download Application</StyledList>
                  <StyledList as="a" href="/admission-form">Online Application</StyledList>
                  <StyledList as="a" href="/rules-and-regulations">Rules and Regulations</StyledList>
                  <StyledList as="a" href="/school-fee">School Fee</StyledList>
                </List>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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

export default IntroAdmissions;
