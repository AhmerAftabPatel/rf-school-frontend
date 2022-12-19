import { s3_url } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import React, { FC, useState } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { tw, css } from 'twind/css';
import Slider from 'react-slick';
import styled from 'styled-components';
import BreadcrumbSection from '@/base/Breadcrumb';
import HtmlDynamic from '@/base/htmlDynamic';
import PreviewModal from '@/base/preview';
interface IProps {
  type: any;
  gallery: any;
}

const headerstyle = css`
  padding: 20px 40px;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

const sections = [
  { key: 'Gallery', content: 'Gallery', link: true, href: '/gallery?type=Photo' },
  { key: 'Folder', content: 'folder', link: true },
];
const src = '/images/libraryjpg.jpg';
const PhotosList: FC<IProps> = ({ type, gallery }) => {
  console.log(gallery, 'gallery');
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState('');

  const openModal = (child) => {
    setOpen(true);
    setPreview(child);
  };
  return (
    <>
      {' '}
      <PreviewModal open={open} setOpen={setOpen}>
        <Image src={`${s3_url + preview?.replace(' ', '+')}`} style={{ height: '600px', width: '100%', margin: '0' }} />
      </PreviewModal>
      <div className={tw(headerstyle)}>
        <Icon name="arrow left" onClick={() => history.back()} />
        <br />
        <BreadcrumbSection sections={sections} />
        {/* <BaseHeading Heading={`${gallery.name}`} size="large" /> */}
        {gallery?.name && <BaseHeading size="small" Heading={gallery.description} />}
        <div>
          <Card.Group itemsPerRow={5} stackable>
            {gallery &&
              gallery?.media &&
              gallery?.media.map((gall, index) => {
                return (
                  <StyledCard
                    color="red"
                    key={index}
                    style={{ textAlign: 'center' }}
                    image
                    onClick={() => openModal(gall)}
                  >
                    <StyledImage  src={`${s3_url + gall?.replace(' ', '+')}`} />
                  </StyledCard>
                );
              })}
          </Card.Group>
        </div>
      </div>
    </>
  );
};

export default PhotosList;

const StyledCard = styled(Card)`
  &&&&& {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border: none;
    // padding: 7px;
    cursor: pointer;

    :hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;

const StyledImage  = styled(Image)`&&&&&{
  height : 200px;
  @media only screen and (max-width: 600px) {
    height : 100%;
  }
}`
