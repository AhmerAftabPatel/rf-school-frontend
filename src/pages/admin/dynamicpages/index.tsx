import { API, s3_url } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import BreadcrumbSection from '@/base/Breadcrumb';
import HtmlDynamic from '@/base/htmlDynamic';
import EditBox from '@/components/admin/forms/editbox';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Accordion, Button, Card, Divider, Header, Icon, Image, Modal } from 'semantic-ui-react';
import withAuth from '../../../helpers/withAuth';
import styled from 'styled-components';
import { useRouter } from 'next/router';
interface IProps {}

/**
 * @author
 * @function @AdminHome
 **/

const AdminPages = (props) => {
  const history = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pages, setPages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState('');
  const [values, setValues] = useState({ _id: '' });
  const [newValues, setNewValues] = useState({ page: '' });
  const [addnewOpen, setAddnewOpen] = useState(false);
  // const [editedValues,setEditValues] = useState()
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
    setOpen(false);
    // setValues(pages[newIndex]);
  };

  const preload = () => {
    axios
      .get(`${API}/pages/all`)
      .then((res) => {
        if (res.data) {
          setPages(res.data);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleEdit = (page) => {
    setValues(page);
    setOpen(true);
  };
  console.log(values, 'files');
  const handleEditClose = () => {
    setOpen(false);
    setValues({ _id: '' });
  };

  const handleSave = () => {
    setLoading(true);
    const formData = new FormData();
    // details.forEach((detail) => {
    formData.set('bannerId', values._id);
    for (var key in newValues) {
      if(newValues[key]){
      formData.set(key, newValues[key]);
      }
    }
    axios
      .put(`${API}/page`, formData)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        preload();
      })
      .catch((err) => {
        setError(err?.response?.data?.error);
        setLoading(false);
      });
  };
  const handleDelete = (id) => {
    if (confirm('Are you sure?')) {
      setLoading(true);

      axios
        .delete(`${API}/page?id=${id}`)
        .then(() => {
          setLoading(false);
          preload();
        })
        .catch((err) => {
          setError(err?.response?.data?.error);
          setLoading(false);
        });
    }
  };

  const handleNewSave = () => {
    setLoading(true);
    const formData = new FormData();

    formData.set('heading', selectedPage);
    formData.set('href', newValues.page.toLowerCase().replace(' ', '-'));
    // details.forEach((detail) => {
    for (var key in newValues) {
      if(newValues[key]){
      formData.set(key, newValues[key]);
      }
    }
    axios
      .post(`${API}/page`, formData)
      .then(() => {
        setSuccess(true);
        preload();
        handleEditClose();
        setAddnewOpen(false)
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.response?.data?.error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  }, [success]);

  const mains = [];

  const handleSelectedPage = (value, index) => {
    setSelectedPage(value);
    setActiveIndex(index);
    setOpen(false);
    window.scrollTo(0, 500);
  };

  const onAddClick = (selectedPages) => {
    setAddnewOpen(true);
    setTimeout(() => {
      window.scrollTo(0,1000);
    },200)
   
    // alert('Not yet integrated, will be done in few hours...');
  };

  return (
    <StyledContainer>
      {/* {activeIndex && editModal()} */}
      <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
      <div>
        <BaseHeading Heading="Dynamic Pages" size="large" />
      </div>
      <Card.Group stackable>
        {pages.map((page, index) => {
          if (mains.indexOf(page.heading) === -1) {
            mains.push(page.heading);

            return (
              <>
                <StyledCard key={index} onClick={() => handleSelectedPage(page.heading, index)}>
                  {page.heading}
                </StyledCard>
              </>
            );
          }
        })}
      </Card.Group>
      <br />
      {selectedPage && (
        <Accordion fluid styled>
          {pages.map((page, index) => {
            if (selectedPage === page.heading) {
              return (
                <StyledDiv highlight={activeIndex === index} key={index}>
                  <Accordion.Title active={activeIndex === index} index={index} onClick={handleClick}>
                    {success && activeIndex === index && <StyledSuccess>Changes Saved!!</StyledSuccess>}
                    {error && activeIndex === index && <StyledError>{error}</StyledError>}
                    <Icon name="dropdown" />
                    <BreadcrumbSection
                      sections={[
                        { key: 0, content: page.heading },
                        { key: 1, content: page.page },
                      ]}
                    />
                    {/* {page.heading} - {page.page} */}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    <Image src={`${s3_url + page.banner}`} size={'small'} />
                    <hr />
                    {open ? (
                      <EditBox
                        loading={loading}
                        values={values}
                        type="notnormal"
                        setValues={setValues}
                        setNewValues={setNewValues}
                        newValues={newValues}
                      />
                    ) : (
                      <HtmlDynamic data={page} />
                    )}
                    <Divider />
                    {success && activeIndex === index && <StyledSuccess>Changes Saved!!</StyledSuccess>}
                    {error && activeIndex === index && <StyledError>{error}</StyledError>}
                    <Button.Group compact>
                      {!open && <Button content="Edit" onClick={() => handleEdit(page)} color={'blue'} />}
                      {!open && (page.heading === 'News and Events' || selectedPage === 'Parents & Students' || selectedPage === 'Students Corner') && (
                        <Button content="Delete" onClick={() => handleDelete(page._id)} color={'red'} />
                      )}
                      {!open && page.folder && (
                        <Button
                          content="View Gallery"
                          onClick={() => history.push(`/admin/gallery/folders/${page.folder}`)}
                          color={'instagram'}
                        />
                      )}
                      {open && <Button content="Cancel" onClick={() => handleEditClose()} color={'red'} />}
                      {open && <Button content="Save" color="green" onClick={() => handleSave()} />}
                    </Button.Group>
                  </Accordion.Content>
                </StyledDiv>
              );
            }
          })}
          {(selectedPage === 'News and Events' || selectedPage === 'Parents & Students' || selectedPage === 'Students Corner') && (
            <Styledbutton onClick={() => onAddClick(selectedPage)}>Add {selectedPage} + </Styledbutton>
           )}
        </Accordion>
      )}

      {addnewOpen && (
        <>
          <EditBox
            loading={loading}
            values={values}
            type="fancy"
            setValues={setValues}
            setNewValues={setNewValues}
            newValues={newValues}
          />
          <Button content="Cancel" onClick={() => handleEditClose()} color={'red'} />
          <Button content="Save" color="green" onClick={() => handleNewSave()} />
        </>
      )}
    </StyledContainer>
  );
};

const Styledbutton = styled.div`
   {
    width: 100%;
    padding: 15px 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 12px;
    text-align: center;
    margin-top: 12px;
    cursor: pointer;

    :hover {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
  }
`;

const StyledDiv = styled.div`{
    // background : ${(props) => (props.highlight ? 'grey' : '')};
    border : ${(props) => (props.highlight ? '1px solid blue' : '')};
    // margin : ${(props) => (props.highlight ? '12px' : '')};
    border-radius : 7px;
}`;

const StyledContainer = styled.div`
   {
    padding: 50px 100px;
  }
`;

const StyledSuccess = styled.div`
   {
    color: #ffffff;
    font-weight: bold;
    fonr-size: 18px;
    width: 100%;
    background: green;
    border: 1px solid green;
    padding: 4px 10px;
    border-radius: 7px;
  }
`;

const StyledError = styled.div`
   {
    color: #ffffff;
    font-weight: bold;
    fonr-size: 18px;
    width: 100%;
    background: red;
    border: 1px solid red;
    padding: 4px 10px;
    border-radius: 7px;
  }
`;

const StyledCard = styled(Card)`
  &&&&& {
    border-radius: 12px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export default withAuth(AdminPages);
