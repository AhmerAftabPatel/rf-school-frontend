import { NextSeo } from 'next-seo';
import Footer from '@/components/footer';
import { tw, css } from 'twind/css';
import SmallHeader from '@/components/header/smallHeader';
import { useRouter } from 'next/router';
import Section from '@/base/Section';

export default function About() {
  const headerstyle = css`
    padding: 20px 50px;

    @media only screen and (max-width: 600px) {
      padding: 0;
    }
  `;
  const history = useRouter();

  return (
    <div>
      <NextSeo
        title="RF School - Comitted For Quality Education"
        description="RF School - Comitted For Quality Education"
      />
      {/* <SmallHeader heading="About us" description="Some thing about school" banner=' '/> */}
      <main className={tw('')}>
        <div className={tw(headerstyle)}>
          {/* <Section data={history.asPath.replace('/', '')}/> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
