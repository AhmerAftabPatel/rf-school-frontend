import { API } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import BreadcrumbSection from '@/base/Breadcrumb';
import ThemeButton from '@/base/Button';
import HtmlDynamic from '@/base/htmlDynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setegid } from 'process';
import { useEffect, useState } from 'react';
import { Accordion, Divider, Icon, Label, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import PostJob from '../../../components/forms/postjob';

const Headerstyle = styled.div`
   {
    padding: 20px 50px;

    @media only screen and (max-width: 600px) {
      padding: 0;
    }
  }
`;
const Careers = () => {
  const history = useRouter();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState({});
  const [edit, setEdit] = useState(-1);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const preload = () => {
    axios
      .get(`${API}/jobs`)
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

  const onClose = () => {
    setOpen(false);
    setEdit(-1);
  };

  const PostJobModal = (
    <>
      <Modal size="small" open={open} onClose={onClose} closeIcon>
        <PostJob onFinish={onClose} job_pre={edit > -1 && jobs[activeIndex]} />
      </Modal>
    </>
  );

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  const DeleteJob = (id) => {
    if (confirm('Are you sure')) {
      axios
        .delete(`${API}/job?id=${id}`)
        .then((res) => {
          alert('deleted!');
          preload()
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  useEffect(() => {
    preload();
    preloadPage();
  }, []);

  const sections = [
    { key: 'Home', content: 'Home', link: true, href: '/admin' },
    { key: 'Jobs', content: 'Jobs', link: true },
  ];

  return (
    <Headerstyle>
      {PostJobModal}
      <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
      <BreadcrumbSection sections={sections} />
      <BaseHeading Heading={'Jobs'} size="small" /> &nbsp;
      <ThemeButton onClick={() => setOpen(true)}>Post New Job</ThemeButton>
      <ThemeButton onClick={() => history.push('/admin/jobs/all')}>View All Candidates</ThemeButton>
      <br />
      <br />
      <Accordion styled fluid>
        {jobs.map((job, index) => {
          if (job.category === 'Faculty') {
            return (
              <StyledDiv>
                <Accordion.Title active={activeIndex === index} index={index} onClick={handleClick}>
                  <Icon name="dropdown" />
                  {job.title}{' '}
                  <Label
                    color={job.status ? 'green' : 'red'}
                    circular
                    size="mini"
                    content={job.status ? 'Live' : 'Job CLosed'}
                  />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <Divider />
                  <p>
                    <div dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                  </p>
                  <ThemeButton onClick={() => history.push(`/admin/jobs/${job._id}?name=${job.title}`)}>
                    View Candidates
                  </ThemeButton>
                  <ThemeButton
                    onClick={() => {
                      setEdit(index);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </ThemeButton>
                  <ThemeButton onClick={() => DeleteJob(job._id)}>Delete</ThemeButton>
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
                  <Label
                    color={job.status ? 'green' : 'red'}
                    circular
                    size="mini"
                    content={job.status ? 'Live' : 'Job CLosed'}
                  />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <Divider />
                  <p>
                    <div dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                  </p>
                  <ThemeButton onClick={() => history.push(`/admin/jobs/${job._id}?name=${job.title}`)}>
                    View Candidates
                  </ThemeButton>
                  <ThemeButton
                    onClick={() => {
                      setEdit(index);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </ThemeButton>
                  <ThemeButton onClick={() => DeleteJob(job._id)}>Delete</ThemeButton>
                </Accordion.Content>
              </StyledDiv>
            );
          }
        })}
      </Accordion>
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
