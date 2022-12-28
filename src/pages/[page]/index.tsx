import { NextSeo } from 'next-seo';
import Footer from '@/components/footer';
import { tw, css } from 'twind/css';
import SmallHeader from '@/components/header/smallHeader';
import { useRouter } from 'next/router';
import Section from '@/base/Section';
import axios from 'axios';
import { API } from '@/../constants';
import { useEffect, useState } from 'react';
import Folder from '@/base/folder';
import { Icon } from 'semantic-ui-react';


export const getStaticPaths = async () => {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}
export const getStaticProps = async (context) => {
  const { params } = context;
  const id = params.page;
  const preload = await axios.get(`${API}/${id}`);
  // const changes = await axios.get(`${API}/changes`);
  //   const fetched = await preload.data.json();
  // console.log(fetched,"fetched")
  if (preload.status !== 200) {
    return {  
      notFound: true,
    };
  }
  return {
    props: preload.data,
    // revalidate: changes ? 10000 : false,
  };
};
export default function About(data) {
  // const [data, setData] = useState({
  //   _id: '',
  //   heading: '',
  //   description: '',
  //   page: '',
  //   banner: '',
  //   hred: '',
  //   folder: '',
  //   flyer : ""
  // });
  const headerstyle = css`
    padding: 20px 50px;

    @media only screen and (max-width: 600px) {
      padding: 0;
    }
  `;
  // const history = useRouter();
  // const preload = (path) => {
  //   axios
  //     .get(`${API}/page?href=${path}`)
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // };
  // useEffect(() => {
  //   if (history.asPath.replace('/', '') !== '[page]') {
  //     preload(history.asPath.replace('/', ''));
  //   }
  // }, [history]);
  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      
      <SmallHeader heading={data.heading} description={data.page} banner={data.banner} />
      <main>
        <div className={tw(headerstyle)}>
          <Section data={data} />
          {/* {data.folder && <Folder id={data.folder} />} */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
