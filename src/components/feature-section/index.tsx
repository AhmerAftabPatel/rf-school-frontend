import { tw } from 'twind';
import Check from '@/constants/svg/check.svg';
import { Image } from 'semantic-ui-react';
import { API, s3_url } from '@/../constants';
import Link from 'next/link';
import styled from 'styled-components';
import HtmlDynamic from '@/base/htmlDynamic';
const FacilitiesSection = [
  { name: 'Science Lab', description: '', image: '/images/sciencelab.png' },
  { name: 'Computer Lab', description: '', image: '/images/computer_lab.png' },
  { name: 'Library', description: '', image: '/images/libraryjpg.jpg' },
  { name: 'Sports', description: '', image: '/images/sciencelab.png' },
  { name: 'Field Trip', description: '', image: '/images/sciencelab.png' },
  { name: 'School Bus', description: '', image: '/images/sciencelab.png' },
];

const FeatureSection = ({ facilities }) => (
  <section className={tw(`bg-white pb-6`)}>
    <div className={tw(`mx-auto sm:p-6 lg:p-1`)}>
      <div className={tw(`container mx-auto p-6 bg-white`)}>
        <div className={tw(`mb-5 text-center`)}>
          {/* <h4 className={tw(`text-base text-indigo-600 font-semibold tracking-wide uppercase`)}>Facilities</h4> */}
          <h2 className={tw(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-blue-900`)} data-aos="fade-in" >
            Facilities
          </h2>
          {/* <HtmlDynamic data={facilities[0]} /> */}
          <p className={tw('mt-2 text-xl text-left')}>
            {/* {facilities[0].description} */}
            <div dangerouslySetInnerHTML={{ __html: facilities[0]?.description }}></div>
          </p>
        </div>
        <div className={tw(`flex flex-wrap my-12`)}>
          {facilities.map((facility, index) => {
            if (index > 0) {
              return (
                <Link href={facility.href}>
                  <div className={tw(`w-full border-b md:w-1/2 md:border-r lg:w-1/4 p-2`)} key={index}>
                    <div className={tw(`flex items-center mb-6`)}>
                      <Check width={20} height={20} fill="currentColor" className={tw(`h-6 w-6 text-indigo-500`)} />
                      <div className={tw(`ml-4 text-2xl font-bold `)}>{facility.page}</div>
                    </div>
                    <StyledImage>
                      <Image centered style ={{height : "100%",width : "100%"}} src={s3_url + facility.banner} />
                    </StyledImage>
                    {/* <p className={tw(`leading-loose text-gray-500`)}>
              Consectetur pariatur irure exercitation sit amet id consectetur consecteturmagna et Lorem labore qui
              velit.
            </p> */}
                  </div>
                </Link>
              );
            }
          })}
          {/* <div className={tw(`w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8`)}>
            <div className={tw(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={tw(`h-6 w-6 text-indigo-500`)} />
              <div className={tw(`ml-4 text-xl`)}>Enterprise-ready</div>
            </div>
            <p className={tw(`leading-loose text-gray-500 `)}>
              Labore duis pariatur est exercitation laboris cupidatat amet cillum. Amet nisi ullamco.
            </p>
          </div>
          <div className={tw(`w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8`)}>
            <div className="flex items-center mb-6">
              <Check width={20} height={20} fill="currentColor" className={tw(`h-6 w-6 text-indigo-500`)} />
              <div className={tw(`ml-4 text-xl`)}>Unlimited growth</div>
            </div>
            <p className={tw(`leading-loose text-gray-500`)}>
              Elit deserunt nisi esse duis cupidatat proident sit minim mollit officia pariatur incididunt in tempor.
            </p>
          </div>
          <div className={tw(`w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8`)}>
            <div className={tw(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={tw(`h-6 w-6 text-indigo-500`)} />
              <div className={tw(`ml-4 text-xl`)}>Recommended by experts</div>
            </div>
            <p className={tw(`leading-loose text-gray-500`)}>
              Velit sit tempor pariatur quis pariatur incididunt culpa dolor voluptate officia incididunt velit dolore.
            </p>
          </div>
          <div className={tw(`w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8`)}>
            <div className={tw(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={tw(`h-6 w-6 text-indigo-500`)} />
              <div className={tw(`ml-4 text-xl`)}>Modern platform</div>
            </div>
            <p className={tw(`leading-loose text-gray-500`)}>
              Laboris elit consectetur sint nisi eu mollit proident sit magna velit adipisicing consequat amet
              reprehenderit.
            </p>
          </div>
          <div className={tw(`w-full md:w-1/2 lg:w-1/3 p-8`)}>
            <div className={tw(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={tw(`h-6 w-6 text-indigo-500`)} />
              <div className={tw(`ml-4 text-xl`)}>Integrations</div>
            </div>
            <p className={tw(`leading-loose text-gray-500`)}>
              Nostrud excepteur incididunt proident sit nulla ipsum sunt nostrud est esse adipisicing irure officia
              consectetur.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  </section>
);

const StyledImage = styled.div`
   {
    height: 170px;
    overflow: hidden;
    border-radius: 15px;
    width: 100%;
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

export default FeatureSection;
