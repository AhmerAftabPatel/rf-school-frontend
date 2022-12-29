import { API } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import ThemeButton from '@/base/Button';
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
      padding: 20px;
    }
  }
`;

export const getStaticProps = async () => {
  const preload = await axios.get(`${API}/page?href=careers`);
  if (preload.status !== 200) {
    return {
      notFound: true,
    };
  }
  return {
    props: preload.data,
  };
};

const Careers = (page) => {
  const [jobs, setJobs] = useState([]);
  // const [page, setPage] = useState({});
  const [activeOpen, setApplyOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const preload = () => {
    setLoading(true);
    axios
      .get(`${API}/jobs?type=live`)
      .then((res) => {
        setJobs(res.data.jobs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert(err);
      });
  };

  // const preloadPage = () => {
  //   axios
  //     .get(`${API}/page?href=careers`)
  //     .then((res) => {
  //       setPage(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    if (activeIndex === index) {
      setApplyOpen(false);
    }
    setActiveIndex(newIndex);
  };

  // const ApplyNow = () => {
  //   scrollTo(0,1000)
  // }

  useEffect(() => {
    preload();
    // preloadPage();
  }, []);
  return (
    <Headerstyle>
      {page && <HtmlDynamic data={page} />}
      <br />
      <BaseHeading Heading={'Faculty'} size="tiny" />
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
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
                  <a href="#apply">
                    <ThemeButton onClick={() => setApplyOpen(true)}>Apply Now</ThemeButton>
                  </a>
                </Accordion.Content>
              </StyledDiv>
            );
          }
        })}
      </Accordion>
      <br />
      <BaseHeading Heading={'Staff'} size="tiny" />
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
                  <a href="#apply">
                    <ThemeButton onClick={() => setApplyOpen(true)}>Apply Now</ThemeButton>
                  </a>
                </Accordion.Content>
              </StyledDiv>
            );
          }
        })}
      </Accordion>
      <br />
      <Divider />

      <StyledCenter>
        {activeOpen && activeIndex > -1 ? (
          <>
            <BaseHeading Heading={'Apply Now'} size="small" center /> &nbsp;{' '}
            <Icon
              size="large"
              style={{ cursor: 'pointer' }}
              name="angle up"
              onClick={() => {
                setApplyOpen(false);
                setActiveIndex(-1);
              }}
            />
          </>
        ) : (
          <ThemeButton
            onClick={() => {
              setApplyOpen(true);
              setActiveIndex(0);
            }}
          >
            Apply Now
          </ThemeButton>
        )}
        <div id="apply">
          {activeOpen && activeIndex > -1 && (
            <StyledForm>
              <CandidateApply job={activeIndex > -1 && jobs[activeIndex]} />
            </StyledForm>
          )}
        </div>
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
    @media only screen and (max-width: 600px) {
      width: auto;
    }
  }
`;

const StyledCenter = styled.div`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media only screen and (max-width: 600px) {
      padding: 12px;
    }
  }
`;

const StyledDiv = styled.div`
   {
    border: #000000;
  }
`;

export default Careers;
