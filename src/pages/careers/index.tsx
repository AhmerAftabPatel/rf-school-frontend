import { API } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import HtmlDynamic from '@/base/htmlDynamic';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Accordion, Divider, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import CandidateApply from '../../components/forms/candidate';

const Headerstyle = styled.div`
   {
    padding: 20px 50px;

    @media only screen and (max-width: 600px) {
      padding: 0;
    }
  }
`;
const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const preload = () => {
    axios
      .get(`${API}/jobs?type=live`)
      .then((res) => {
        setJobs(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const preloadPage = () => {
    axios
      .get(`${API}/page?href=careers`)
      .then((res) => {
        setPage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    preload();
    preloadPage();
  }, []);
  return (
    <Headerstyle>
      {page && <HtmlDynamic data={page} />}
      <br />
      <BaseHeading Heading={'Faculty'} size="small" />
      <Accordion styled fluid>
        {jobs.map((job, index) => {
          if (job.category === 'Faculty') {
            return (
              <StyledDiv>
                <Accordion.Title active={activeIndex === index} index={index} onClick={handleClick}>
                  <Icon name="dropdown" />
                  {job.title}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <Divider />
                  <p>
                    <div dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                  </p>
                </Accordion.Content>
              </StyledDiv>
            );
          }
        })}
      </Accordion>
      <br />
      <BaseHeading Heading={'Staff'} size="small" />
      <Accordion styled fluid>
        {jobs.map((job, index) => {
          if (job.category === 'Staff') {
            return (
              <StyledDiv>
                <Accordion.Title active={activeIndex === index} index={index} onClick={handleClick}>
                  <Icon name="dropdown" />
                  {job.title}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <Divider />
                  <p>
                    <div dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                  </p>
                </Accordion.Content>
              </StyledDiv>
            );
          }
        })}
      </Accordion>
      <br />
      <Divider />

      <StyledCenter>
        <BaseHeading Heading={'Apply Now'} size="small" center />
        <StyledForm>
          <CandidateApply job={activeIndex && activeIndex > -1 && jobs[activeIndex]} />
        </StyledForm>
      </StyledCenter>
    </Headerstyle>
  );
};

const StyledForm = styled.div`
   {
    padding: 14px;
    margin: 14px;
    border: 5px;
    width: 900px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
  }
`;

const StyledCenter = styled.div`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
      padding: 0;
    }
  }
`;

const StyledDiv = styled.div`
   {
    border: #000000;
  }
`;

export default Careers;
