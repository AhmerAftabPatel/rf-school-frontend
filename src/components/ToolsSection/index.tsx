import { Card, Image } from 'semantic-ui-react';
import { tw } from 'twind';
import { home_tools } from '@/../strings/homestrings';
import Link from 'next/link';
import styled from 'styled-components'
const ToolsSection = () => (
  <section className={tw(`text-white py-4`)}>
    {/* <div className={tw("flex grid grid-col-4 grid-flow-col gap-4")}>
    <div className={tw("h-24 p-5 bg-rose-400 flex items-center justify-center")}>01</div>
    <div className={tw("h-24 p-5 bg-rose-400 flex items-center justify-center")}>01</div>
    <div className={tw("h-24 p-5 bg-rose-400 flex items-center justify-center")}>01</div>
    <div className={tw("h-24 p-5 bg-rose-400 flex items-center justify-center")}>01</div>
    </div> */}
    <Card.Group itemsPerRow={4} centered stackable>
      {home_tools.map((tool, index) => {
        return (
          <Link href={tool.href} key={index}>
            <StyledCard>
              <div className={tw(`h-48 p-5 shadow-md bg-${tool.color}-400 flex items-center justify-center text-white`)}>
                <Image src={tool.icon} size="tiny" /> &nbsp;
                <h3 className={tw('font-extrabold')}>
                  {tool.label}
                  {/* Online <br /> */}
                  {/* Admission Form */}
                </h3>
              </div>
            </StyledCard>
          </Link>
        );
      })}
      {/* <div className={tw('flex flex-nowrap justify-around text-white')}> */}
      {/* <Card>
        <div className={tw('h-48 p-5 shadow-md bg-red-400 flex items-center justify-center')}>
          <Image src="/images/icons/checklist.png" size="tiny" /> &nbsp;
          <h3 className={tw('font-extrabold')}>
            Online <br />
            Admission Form
          </h3>
        </div>
      </Card>
      <Card>
        <div className={tw('h-48 shadow-md p-5 bg-blue-400 flex items-center justify-center')}>
          <Image src="/images/icons/cashless-payment.png" size="tiny" /> &nbsp;
          <h1 className={tw('text-2xl font-extrabold')}>
            Online <br />
            Tuition Payment
          </h1>
        </div>
      </Card>
      <Card>
        <div className={tw('h-48 shadow-md p-5 bg-green-400 flex items-center justify-center')}>
          <Image src="/images/icons/charity.png" size="tiny" /> &nbsp;
          <h1 className={tw('text-2xl font-extrabold')}>&nbsp;Volunteer Signup</h1>
        </div>
      </Card>
      <Card>
        <div className={tw('h-48 shadow-md p-5 bg-yellow-400 flex items-center justify-center')}>
          <Image src="/images/icons/gallery.png" size="tiny" /> &nbsp;
          <h1 className={tw('text-2xl font-extrabold')}>&nbsp;Photo Gallery</h1>
        </div>
      </Card> */}
      {/* </div> */}
    </Card.Group>
  </section>
);

const StyledCard = styled(Card)`&&&&&{
  padding : 0;
  margin : 0 auto;
  height : 150px;
  // border-bottom : 4px solid rgb(0 0 0 0 / 10%);
  box-shadow: rgba(17, 17, 26, 0.1) 0px 5px 0px;
}`

export default ToolsSection;
