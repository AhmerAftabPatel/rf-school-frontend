import { s3_url } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import React, { FC, useState } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { tw, css } from 'twind/css';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PreviewModal from '@/base/preview';
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
  padding: 20px 40px;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
const src = '/images/libraryjpg.jpg';
export const GallerySlider: FC<IProps> = ({ type, gallery }) => {
  const history = useRouter();
  return (
    <div className={tw(headerstyle)}>
      <BaseHeading Heading={`${type} Gallery`} size="large" />
      {/* <h1 className={tw('text-4xl font-bold my-4 text-left')}>Photo Gallery</h1> */}
      {/* <p className={tw("text-xl")}> */}
      {/* Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing */}
      {/* layouts and visual mockups. */}
      {/* </p> */}
      <div>
        <Card.Group itemsPerRow={5} stackable>
          {/* <Slider {...settings}> */}
          {gallery.map((gall, index) => {
            return (
              // <div key={index}>
              <StyledCard
                color="red"
                key={index}
                style={{ textAlign: 'center' }}
                image
                onClick={() => history.push({ pathname: `/gallery/${gall._id}` })}
              >
                {/* {gall.type === 'Photo' ? ( */}
                <SyledImage
                  // style={{ height: '200px' }}
                  // style={{ width: '300px', height: '200px' }}
                  src={`${s3_url + gall.image_url?.replace(' ', '+')}`}
                />
                <hr />
                {/* // ) : (
                  //   <video controls>
                  //     <source src={`${s3_url + gall.image_url}`} type="video/mp4" />
                  //   </video>
                  // )} */}
                {/* <h2>{gall.name}</h2> */}
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
    // height : 200px;
    // overflow : hidden;

    :hover {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    @media only screen and (max-width: 600px) {
      padding: 0px;
      width: 100%;
    }
  }
`;

const SyledImage = styled(Image)`&&&&&{
  height : 200px;
  @media only screen and (max-width: 600px) {
    height : 100%;
  }
}`
