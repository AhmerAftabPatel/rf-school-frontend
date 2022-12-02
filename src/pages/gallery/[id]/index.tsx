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
import PhotosList from '../../../components/gallery/folder';

/**
 * @author
 * @function @Gallery
 **/

const FolderPhotos = () => {
  const [gallery, setGallery] = useState({});
  const history = useRouter();
  const preload = (id: any) => {
    axios
      .get(`${API}/folder?folderId=${id}`)
      .then((res) => {
        console.log(res);
        setGallery(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(gallery, 'gaeyyr');

  useEffect(() => {
    if (history.query.id) {
      preload(history.query.id);
    }
  }, [history.query.id]);
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      <SmallHeader heading="School Gallery" description="Galley information" banner="" />
      <main>{gallery && <PhotosList type={history.query.type} gallery={gallery} />}</main>
      <Footer />
    </div>
  );
};

export default FolderPhotos;
