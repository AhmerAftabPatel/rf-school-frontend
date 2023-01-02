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
  const [preview, setPreview] = useState(0);

  const openModal = (child, index) => {
    setOpen(true);
    setPreview(index);
  };
  return (
    <>
      {' '}
      <PreviewModal open={open} setOpen={setOpen}>
        <div style={{ height: '600px', width: '100%', margin: '0', position: 'relative' }}>
          <Image
            src={`${s3_url + gallery?.media?.[preview]?.replace(' ', '+')}`}
            style={{ height: '600px', width: '100%', margin: '0' }}
          />
          {preview > 0 && (
            <Icon
              style={{ position: 'absolute', left: -10, margin: 'auto', top: 300, zIndex: 999, color: '#FFFFFF' }}
              size="huge"
              name="angle left"
              onClick={() => setPreview(preview - 1)}
            />
          )}
          {preview < gallery?.media?.length - 1 && (
            <Icon
              style={{ position: 'absolute', right: -30, display: 'flex', margin: 'auto', top: 300, color: '#FFFFFF' }}
              size="huge"
              name="angle right"
              onClick={() => setPreview(preview + 1)}
            />
          )}
        </div>
      </PreviewModal>
      <div className={tw(headerstyle)}>
        <Icon name="arrow left" onClick={() => history.back()} />
        <br />
        <BreadcrumbSection sections={sections} />
        {/* <BaseHeading Heading={`${gallery.name}`} size="large" /> */}
        {gallery.description && <BaseHeading size="small" Heading={gallery.description} />}
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
                    onClick={() => openModal(gall, index)}
                  >
                    <StyledImage src={`${s3_url + gall?.replace(' ', '+')}`} />
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

const StyledImage = styled(Image)`
  &&&&& {
    height: 200px;
    @media only screen and (max-width: 600px) {
      height: 100%;
    }
  }
`;
