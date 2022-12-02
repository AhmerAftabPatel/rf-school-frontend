import { API, s3_url } from '@/../constants';
import Link from 'next/link';
import React, { FC } from 'react';
import { Card, Grid, Icon, Image } from 'semantic-ui-react';
import { tw } from 'twind';
import styled from 'styled-components';
import BaseHeading from '@/base/BaseHeader';
interface IProps {
  type: string;
  curriculum: any;
}

/**
 * @author
 * @function @AcademicsInfo
 **/

export const AcademicsInfo: FC<IProps> = ({ type, curriculum }) => {
  return (
    <div className={tw('py-5')}>
      {type !== 'general' ? (
        <Grid stackable>
          {/* <Card.Group itemsPerRow={3} stackable> */}
          {curriculum.map((school, index) => {
            return (
              <Grid.Row
                id={`${school.href}`}
                key={index}
                widths={'2'}
                style = {{marginBottom : "12px"}}
                reversed={index % 2 === 0 ? 'device' : 'computer'}
              >
                <Grid.Column width={8}>
                  <Image
                    src={school.banner ? s3_url  + school.banner : '/images/dummyprofile'}
                    size="massive"
                    style={{ height: '500px' }}
                    centered
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <div>
                    {/* <h1>{school.page}</h1> */}
                    <BaseHeading Heading={school.page} size="small"/>
                    <div style={{ maxHeight: '400px', overflow: 'auto',padding : "0 7px" }}>
                      <div dangerouslySetInnerHTML={{ __html: school?.description }}></div>
                    </div>
                    {/* <p>{school.description}</p> */}
                  </div>
                </Grid.Column>
              </Grid.Row>
            );
          })}
        </Grid>
      ) : (
        <Card.Group itemsPerRow={3} stackable>
          {curriculum.map((school, index) => {
            return (
              <Link key={index} href={'academics#' + school.href}>
                <Card raised color="blue">
                  <StyledImage>
                    <Image
                      centered
                      src={school.banner ? s3_url + school.banner : '/images/dummyprofile'}
                      style={{ height: '100%', width: '100%' }}
                      // size="medium"
                      // wrapped
                      // ui={false}
                    />
                  </StyledImage>
                  <Card.Content textAlign='center'>
                    <Card.Header>{school.page}</Card.Header>
                    {/* <Card.Description> */}
                      {/* <div dangerouslySetInnerHTML={{ __html: school?.description.slice(0,50) }}></div> */}
                    {/* </Card.Description> */}
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </Card.Group>
      )}

      {/* </Card.Group> */}
    </div>
  );
};

const StyledImage = styled.div`
   {
    height: 300px;
    overflow  hidden;
  }
`;
