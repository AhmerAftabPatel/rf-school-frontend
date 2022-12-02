import { API, s3_url } from '@/../constants';
import axios from 'axios';
import { Container, Divider, Grid, Image, List } from 'semantic-ui-react';
import { tw, css } from 'twind/css';
import { welcome_message, AccordiionData, messages, news_events } from '../../../strings/homestrings';
import { useEffect, useRef, useState } from 'react';
import HtmlDynamic from '@/base/htmlDynamic';
import BaseHeading from '@/base/BaseHeader';
import Link from 'next/link';
// export const getServerSideProps = async (context) => {
//   const preload = await axios.get(`${API}/page?href=welcome`);
//   const fetched = await preload.data.json();
// console.log(fetched,"fetched")
//   if (preload.status !== 200) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       welcome: fetched,
//     },
//   };
// };
const InfoSection = ({ welcome, message, newsandevents, parentsandstudents }) => {
  // console.log(welcome,"welcome")
  return (
    <section className={tw(`bg-white pb-6 py-5`)}>
      <Container fluid>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <div className={tw('bg-gray-100 p-4 rounded h-full')}>
                <BaseHeading Heading="Parents and Students" size="small" />
                {/* <h1 className={tw('text-2xl font-bold')}>Parents and Students</h1> */}
                <List>
                  {parentsandstudents.map((accord, index) => {
                    return (
                      <Link href={accord.href}>
                        <List.Item style={{ cursor: 'pointer' }} key={index} className={tw('text-xl font-medium m-2')}>
                          -- {accord.page}
                        </List.Item>
                      </Link>
                    );
                  })}
                   <Link href={"students-corner"}>
                        <List.Item style={{ cursor: 'pointer' }}  className={tw('text-xl font-medium m-2')}>
                          -- Students Corner
                        </List.Item>
                      </Link>
                </List>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div
                className={tw('bg-white p-4 rounded h-full')}
                style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
              >
                <HtmlDynamic data={welcome} />
                {/* <div>
                  <h1 className={tw('text-2xl font-bold')}>WELCOME TO RF SCHOOL</h1>
                </div>
                <div className={tw('py-2 text-xl')}>
                  <p>{welcome_message}</p>
                </div> */}
                <br />
                <div>
                  <BaseHeading Heading={`${message.type}'s Message`} size="small" />
                </div>
                <div className={tw('py-2 text-xl')}>
                  <Grid stackable>
                    <Grid.Row columns={2}>
                      <Grid.Column width={4}>
                        <div className={tw('py-2')}>
                          <Image src={message.photo ? s3_url + message.photo : '/images/dummyprofile.png'} />
                          <p>{message.FirstName + ' ' + message.LastName}</p>
                        </div>
                      </Grid.Column>
                      <Grid.Column width={12}>
                        <div className={tw('h-full flex items-center justify-center')}>
                          <p>{message.message}</p>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <div className={tw('py-4 px-4 bg-gray-100 rounded h-full')}>
                <BaseHeading Heading="News and Events" size="small" />
                {/* <h1 className={tw('text-2xl')}>NEWS AND EVENTS</h1> */}
                <div style={{ overflow: 'auto', maxHeight: '600px' }}>
                  {newsandevents.map((news, index) => {
                    console.log(news.href, 'news.href');
                    return (
                      <Link key={index} href={encodeURIComponent(news.href)}>
                        <div
                          className={tw(
                            'items-center text-bold hover:text-blue-800 cursor-pointer mb-2 text-ellipsis overflow-hidden',
                          )}
                        >
                          <div dangerouslySetInnerHTML={{ __html: news?.description?.slice(0, 140) + '...' }}></div>
                          {/* {news?.description?.slice(1, 140)} */}
                          {/* <hr /> */}
                          <Divider />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </section>
  );
};

export default InfoSection;
