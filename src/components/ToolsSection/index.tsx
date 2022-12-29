import { Card, Image } from 'semantic-ui-react';
import { tw } from 'twind';
import { home_tools } from '@/../strings/homestrings';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ToolsSection = ({mobile}) => {
  const history = useRouter();
  return (
    <section className={tw(`text-white py-4`)}>
      <Card.Group itemsPerRow={mobile ? 1 : 4} centered stackable>
        {home_tools.map((tool, index) => {
          return (
            <StyledCard onClick={() => history.push(tool.href)}>
              <div className={tw(`p-5 shadow-md bg-${tool.color}-400 flex items-center justify-center text-white`)}>
                <Image src={tool.icon} size="tiny" /> &nbsp;
                <h3 className={tw('font-extrabold')}>
                  {tool.label}
                </h3>
              </div>
            </StyledCard>
          );
        })}
      </Card.Group>
    </section>
  );
};



const StyledCard = styled(Card)`
  &&&&& {
    padding: 0;
    margin: 0 auto;
    height: 100%;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 5px 0px;
    @media only screen and (max-width: 600px) {
      height: 20px;
      margin: 13px auto;
    }
  }
`;

export default ToolsSection;
