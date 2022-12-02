import { s3_url } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import React, { FC } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { tw, css } from 'twind/css';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useRouter } from 'next/router';
interface IProps {
  type: any;
  gallery: any;
}
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

/**
 * @author
 * @function @GallerySlider
 **/
const headerstyle = css`
  padding: 20px 50px;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
const src = '/images/libraryjpg.jpg';
export const VideosSlider: FC<IProps> = ({ type, gallery }) => {
  const history = useRouter();
  return (
    <div className={tw(headerstyle)}>
      <BaseHeading Heading={`Video Gallery`} size="large" />
      <div>
        <Card.Group itemsPerRow={5}>
          {gallery.map((gall, index) => {
            return (
              // <div key={index}>
              <StyledCard color="red" key={index} style={{ textAlign: 'center' }}>
                {gall.type === 'Photo' ? (
                  <Image
                    style={{ height: '200px' }}
                    // style={{ width: '300px', height: '200px' }}
                    src={`${s3_url + gall.image_url?.replace(' ', '+')}`}
                  />
                ) : (
                  <video controls>
                    <source src={`${s3_url + gall.image_url?.replace(' ', '+')}`} type="video/mp4" />
                  </video>
                )}
                <h2>{gall.name}</h2>
                <p>{gall.description}</p>
              </StyledCard>
              // </div>
            );
          })}

          {/* </Slider> */}
        </Card.Group>
      </div>
    </div>
  );
};

const StyledCard = styled(Card)`
  &&&&& {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border: none;
    padding: 7px;
    cursor: pointer;

    :hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;
