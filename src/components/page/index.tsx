import Head from 'next/head';
// import Navigation from '@/components/navigation';
import { tw } from 'twind';
import dynamic from 'next/dynamic';
const Navigation = dynamic(() => import('@/components/navigation'), {
  ssr: false,
});
interface IProps {
  children: React.ReactNode;
}

const Page = ({ children }: IProps) => (
  <div>
    <Head>
      <link rel="icon" href="/logo.jpg" />
    </Head>
    <div className={tw(`min-h-screen flex flex-col`)}>
      <Navigation />
      {children}
    </div>
  </div>
);

export default Page;
