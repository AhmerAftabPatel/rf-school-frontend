import { API } from '@/../constants';
import Footer from '@/components/footer';
import { GallerySlider } from '@/components/gallery/PhotoSlider';
import Header from '@/components/header';
import SmallHeader from '@/components/header/smallHeader';
import Page from '@/components/page';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface IProps {}

/**
 * @author
 * @function @Gallery
 **/

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const history = useRouter();
  const preload = () => {
    axios
      .get(`${API}/folders?page=Gallery`)
      .then((res) => {
        console.log(res);
        setGallery(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, [history.query.type]);
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <SmallHeader heading="School Gallery" description="Galley information" banner="" />
      <main >
        <GallerySlider type={history.query.type} gallery={gallery} />
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
