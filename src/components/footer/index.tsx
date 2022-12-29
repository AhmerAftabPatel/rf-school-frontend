import { tw } from 'twind';
import Button from '@/components/button';
import { Divider, Grid, Icon, List } from 'semantic-ui-react';
import LogoDetails from '../logoDetails';
import styled from 'styled-components';
import Link from 'next/link';
import CopyRights from '@/base/CopyRights';

const productLinks = [`Online Donation`, `Donations In Person`, `Contac Us`];
const aboutLinks = [`About Us`, `Careers`, `Leadership`, `Blog`, `Events`, `Press`];
const resourceLinks = [`Home`, `Desicipline`, `Careers`];
// background : url("/images/net-background.png");
const Footer = () => (
  <StyledFooter>
    {/* <footer className={tw(`text-white border-t border-gray-400 pt-14 pb-16`)}> */}
    <Grid stackable>
      <Grid.Row columns={3}>
        <Grid.Column>
          {/* <LogoDetails color='white' logo='/logo-white.png'/> */}
          <LogoDetails color="white" logo="/logo-white.png" />
          {/* Copyright 2021 Expertia AI. All Rights Reserved. */}
        </Grid.Column>
        <Grid.Column>
          <div className={tw(`mb-14 flex items-left justify-center flex-col`)}>
            <h1 className={tw('text-2xl')}>Quick Links</h1>
            <div className={tw('h-0.5 bg-black w-5 mt-2')} />
            <div className={tw('flex justify-left gap-10 mt-6 text-white')}>
              <div>
                <List style ={{color : "white"}}>
                  <Link  passHref href={'/'}>
                    <List.Item style ={{color : "white"}}>Home</List.Item>
                  </Link>
                  {/* <Link href={"/"}></Link><List.Item>Discipline</List.Item> */}
                  <Link passHref href={'/mission-and-core-values'}>
                    <List.Item style ={{color : "white"}}>About</List.Item>
                  </Link>
                  <Link passHref href={'/careers'}>
                    <List.Item style ={{color : "white"}}>Careers</List.Item>
                  </Link>
                  <Link passHref href={'/faculty'}>
                    <List.Item style ={{color : "white"}}>Faculty</List.Item>
                  </Link>
                </List>
              </div>
              <div>
                <List>
                  {/* <List.Item>Online Donations</List.Item>
                  <List.Item>Donations In Person</List.Item> */}
                  
                  <Link passHref href={'/academics-overview'}>
                    <List.Item style ={{color : "white"}}>Admissions</List.Item>
                  </Link>
                  <Link passHref href={'/privacy-policy'}>
                    <List.Item style ={{color : "white"}}>Privacy Policy</List.Item>
                  </Link>
                  <Link passHref href={'/terms-and-conditions'}>
                    <List.Item style ={{color : "white"}}>Terms and Conditions</List.Item>
                  </Link>
                  {/* <List.Item>Contact Us</List.Item> */}
                </List>
              </div>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column>
          <h1 className={tw('text-2xl')}>Contact Us</h1>
          <div className={tw('h-0.5 bg-black w-5 mt-2')} />
          <div className={tw('flex justify-left gap-10 mt-6')}>
            <div>
              <List>
                <List.Item>
                  RF School
                  <br />
                  Hamali Colony, Zaheerabad,<br/> Dist : Sanga Reddy, TS.
                </List.Item>
                <br />
                <List.Item>
                  <Icon name="call" /> &nbsp; 9866459091, 9491209995
                </List.Item>
                <List.Item>
                  <Icon name="mail" /> &nbsp; rfschool@yahoo.com
                </List.Item>
              </List>
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    {/* <Divider /> */}
    <CopyRights />
  </StyledFooter>
);

const StyledFooter = styled.footer`
   {
    background: #1e3a8a;
    // background : #eff6ff;
    // background : url("/images/net-background.png");
    color: #ffffff;
    // padding : 30px 16px 40px 16px;
  }
`;

export default Footer;
