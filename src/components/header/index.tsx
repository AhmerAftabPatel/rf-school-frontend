import { tw, css } from 'twind/css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { API, s3_url } from '@/../constants';
import styled from 'styled-components';
import axios from 'axios';

// background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url('/images/schoolasset.png');
const HeaderStyledInner = styled.div`
   {
    // background: #155e75;
    // background: rgb(39 10 161 / 73%);
    padding: 5px 10px;
    color: white;
    text-align: left;
    display: inline-block;
    max-width: fit-content;
  }
`;

const Subheader = styled.div`
   {
    background: rgb(39 10 161 / 73%);
    padding: 5px;
    color: white;
    padding: 5px 10px;
    text-align: left;
    max-width: fit-content;
  }
`;

interface IProps {
  // heading: string;
  // description: string;
  page: string;
  banner: any;
  mobile: boolean;
}

const Header = ({ page, banner, mobile }: IProps) => {
  // const [banner, setBanner] = useState([]);
  // const [pageNumber, setPage] = useState(0);
  // const preload = () => {
  //   axios.get(`${API}/banner?page=${page}`).then((res: any) => {
  //     setBanner(res.data);
  //     console.log(res, 'res');
  //   });
  // };

  // useEffect(() => {
  //   AOS.init();
  //   preload();
  // }, []);

  // const settings = {
  //   customPaging: function (i) {
  //     return (
  //       <a>
  //         <img src={`${s3_url + banner[i]?.image_url.replace(' ', '+')}`} />
  //       </a>
  //     );
  //   },
  //   dots: true,
  //   dotsClass: 'slick-dots slick-thumb',
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'center',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
  return (
    <StyledDiv>
      <Slider {...settings}>
        {banner.map((bann, index) => {
          return (
            <div key={index}>
              <HeaderStyled style={{ backgroundImage: `url(${s3_url + bann.image_url.replace(' ', '+')})` }}>
                {bann?.info && (
                  <div className={tw(`flex flex-col justify-center text-left sm:px-6 lg:px-16 w-full`)}>
                    <HeaderStyledInner>
                      <h1
                        className={tw(`font-bold text-4xl md:text-5xl lg:text-8xl text-left leading-snug text-white`)}
                      >
                        {bann.title}
                      </h1>
                    </HeaderStyledInner>
                    <Subheader>
                      <div className={tw(`mx-auto`)}>
                        <p className={tw(`text-white text-left text-xl lg:text-3xl`)}>{bann.description}</p>
                      </div>
                    </Subheader>
                  </div>
                )}
              </HeaderStyled>
            </div>
          );
        })}
      </Slider>
    </StyledDiv>
  );
};

const HeaderStyled = styled.div`
   {
    background-color: #ffffff;                                              
    // background-image: ${(props) => (props.url ? `url(${props.url})` : `url('/images/schoolasset.png')`)};
    background-size: cover;
    background-position: center;
    display: flex;
    // border: 10px solid white;
    background-repeat: no-repeat;
    width: full;
    min-height: calc(100vh - 25rem);
    border-radius : 16px;
    @media only screen and (max-width: 600px) {
      min-height: calc(100vh - 40rem);
      border-radius : 0px;
      padding : 0px;
      margin : 0px;
    }
  }
`;

const StyledDiv = styled.div`
   {
    padding: 15px 50px;
    @media only screen and (max-width: 600px) {
      padding: 5px;
      overflow: hidden;
      height: 100%;
      margin-bottom: 25px;
    }
  }
`;

export default Header;
