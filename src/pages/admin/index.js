import BaseHeading from '@/base/BaseHeader';
import { signout } from '@/helpers/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { Accordion, Card, Container, Divider, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import withAuth from '../../helpers/withAuth';

/**
 * @author
 * @function @AdminHome
 **/

const edits = [
  { label: 'Dynamic Pages', icon: 'home', href: '/admin/dynamicpages' },
  { label: 'Contact Us', icon: 'phone square', href: '/admin/contact-us' },
  { label: 'Volunteer Signups', icon: 'user', href: '/admin/volunteer' },
  { label: 'Banners', icon: 'home', href: '/admin/banners' },
  { label: 'People/Board Members', icon: 'home', href: '/admin/people' },
  { label: 'Announcements', icon: 'home', href: '/admin/announcements' },
  { label: 'Gallery', icon: 'picture', href: '/admin/gallery' },
  { label: 'Footer', icon: 'lock', href: '' },
  { label: 'Careers', icon: 'lock', href: '' },
];

const Admin = (props) => {
  const history = useRouter();
  return (
    <StyledDiv>
      <BaseHeading Heading="Admin Dashboard" size="large" />
      <Container>
        <BaseHeading Heading="Admin Tools" size="small" />
        <Card.Group stackable>
          {edits.map((edit, index) => {
            return (
              <Link key={index} href={edit.href}>
                <StyledCard disabled={edit.href ? false : true}>
                  <Icon name={!edit.icon ? 'home' : edit.icon} /> {edit.label}
                </StyledCard>
              </Link>
            );
          })}
        </Card.Group>
        <Divider />
        <BaseHeading Heading="Setting" size="small" />
        <Card.Group>
          <StyledCard onClick={() => signout('secret', () => history.push('/admin'))}>
            <Icon name={'log out'} /> Logout
          </StyledCard>
          <StyledCard onClick={() => signout(() => alert('Not yet integrated'))}>
            <Icon name={'paint brush'} /> Change Password
          </StyledCard>
        </Card.Group>
      </Container>
    </StyledDiv>
  );
};

const StyledCard = styled(Card)`
  &&&&& {
    border-radius: 12px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: ${(props) => (props.disabled ? 'none' : '')};
    border-bottom: ${(props) => (props.disabled ? '1px solid red' : '')};
  }
`;

const StyledDiv = styled.div`
   {
    height: 100%;
    padding: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default withAuth(Admin);
