import { API, s3_url } from '@/../constants';
import BaseHeading from '@/base/BaseHeader';
import BreadcrumbSection from '@/base/Breadcrumb';
import HtmlDynamic from '@/base/htmlDynamic';
import EditBox from '@/components/admin/forms/editbox';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Accordion, Button, Card, Divider, Form, Header, Icon, Image, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import withAuth from '../../../helpers/withAuth';
import { useRouter } from 'next/router';
interface IProps {}

/**
 * @author
 * @function @AdminHome
 **/

const AdminBanners = (props) => {
  const history = useRouter();
  const [banners, setBanners] = useState([]);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [banner, setBanner] = useState({
    title: '',
    image_url: null,
    description: '',
    type: '',
    page: 'Gallery',
    info: false,
  });
  const { image_url } = banner;
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('');
  const preload = () => {
    axios
      .get(`${API}/banners?page=Gallery`)
      .then((res) => {
        setBanners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  let mains = [];
  const handleSelectedPage = (value, index) => {
    setSelectedPage(value);
  };

  const handleChange = (name) => (e) => {
    if (name === 'image_url') {
      setBanner({ ...banner, [name]: e.target.files[0] });
    } else {
      setBanner({ ...banner, [name]: e.target.value });
    }
  };
  const handleEditClose = () => {
    setOpen(false);
    setBanner({
      title: '',
      image_url: null,
      description: '',
      page: 'Gallery',
      type: '',
      info: false,
    });
  };
  const onDelete = (banner) => {
    if (confirm('Are you sure?')) {
      axios
        .delete(`${API}/banner?id=${banner._id}`)
        .then((res) => {
          console.log(res);
          preload();
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };
  const handleSubmit = () => {
    if (!banner.page) {
      alert('Please select banner page');
    } else {
      const formData = new FormData();
      formData.set('page', 'Gallery');
      formData.set('type', 'Photo');
      // details.forEach((detail) => {
      for (var key in banner) {
        formData.set(key, banner[key]);
      }
      axios
        .post(`${API}/banner`, formData)
        .then((res) => {
          let page = banner.type;
          setSuccess(true);
          setOpen(false);
          preload();
          setSelectedPage(page);
          setBanner({
            title: '',
            image_url: null,
            description: '',
            type: '',
            page: 'Gallery',
            info: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
  }, [success]);

  const onEditClick = (values) => {
    setOpen(true);
    setBanner(values);
    window.scrollTo(100, 0);
  };

  const onAddClick = (value) => {
    setOpen(true);
    setBanner({ ...banner, type: value });
  };
  return (
    <StyledContainer>
      {/* {activeIndex && editModal()} */}
      <Icon name="arrow left" color="blue" style={{ cursor: 'pointer' }} onClick={() => history.back()} />
      <div>
        <BaseHeading Heading="Gallery" size="large" />
      </div>
      <Card.Group itemsPerRow={4}>
        {banners.map((banner, index) => {
          if (mains.indexOf(banner.type) === -1 && banner.page === 'Gallery') {
            mains.push(banner.type);
            return (
              <>
                <StyledCard key={index} onClick={() => handleSelectedPage(banner.type, index)}>
                  {banner.type}
                </StyledCard>
                {/* <Divider /> */}
              </>
            );
          }
        })}
        <StyledCard onClick={() => history.push('/admin/gallery/folders')}>Folders</StyledCard>
      </Card.Group>

      <br />
      {!open && <Styledbutton onClick={() => onAddClick('Photo')}>Add Photo Gallery + </Styledbutton>}
      {!open && <Styledbutton onClick={() => onAddClick('Video')}>Add Video Gallery + </Styledbutton>}
      {open && (
        <StyledEditContainer>
          <div>
            {success && <StyledSuccess>Changes Saved!!</StyledSuccess>}
            {error && <StyledError>{error}</StyledError>}
            <h3 style={{ textAlign: 'center' }}>Add/edit Gallery</h3>
          </div>
          <StyledContact>
            {/* <div>add Banner. &nbsp;</div> */}

            <Form loading={loading}>
              <Form.Input
                type="text"
                label="Title"
                accept="video/*"
                maxLength="50"
                onChange={handleChange('title')}
                value={banner.title}
              />
              <Form.Input
                type="text"
                label="Description"
                maxLength="100"
                onChange={handleChange('description')}
                value={banner.description}
              />
              {/* <Form.Dropdown
                label="Page"
                selection
                options={mains.map((main, index) => ({ key: main, text: main, value: main }))}
                onChange={(e, data) => setBanner({ ...banner, page: data.value })}
                value={banner.page}
              /> */}
              <Form.Button onClick={() => setBanner({ ...banner, info: !banner.info })} icon labelPosition="left">
                <Icon name={banner.info ? 'eye' : 'eye slash'} />
                Info Toggle
              </Form.Button>
              <div>
                <label>
                  <strong>Gallery Image</strong>
                </label>
                {/* {image_url ? ( */}
                <input type="file" onChange={handleChange('image_url')} />
                {image_url &&
                  (banner.type === 'Photo' ? (
                    <Image
                      size="medium"
                      src={
                        image_url && typeof image_url !== 'string'
                          ? URL.createObjectURL(image_url)
                          : `${s3_url + banner.image_url}`
                      }
                    />
                  ) : (
                    <video controls autoPlay>
                      <source
                        src={
                          image_url && typeof image_url !== 'string'
                            ? URL.createObjectURL(image_url)
                            : `${s3_url + banner.image_url}`
                        }
                        type="video/mp4"
                      />
                    </video>
                  ))}
                {/* ) : ( */}

                {/* )} */}
              </div>
            </Form>
          </StyledContact>
          <br />
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            <Button.Group compact>
              {open && <Button content="Cancel" onClick={() => handleEditClose()} color={'red'} />}
              {open && <Button content="Save" color="green" onClick={handleSubmit} />}
            </Button.Group>
          </div>
          <Divider />
        </StyledEditContainer>
      )}
      <br />
      {selectedPage &&
        banners.map((banner, index) => {
          if (banner.type === selectedPage) {
            return (
              <>
                <StyledContact key={index}>
                  <div>{index + 1}. &nbsp;</div>
                  <div>
                    {banner?.type === 'Photo' ? (
                      <Image
                        style={{ width: '300px', height: '200px' }}
                        src={`${s3_url + banner.image_url?.replace(' ', '+')}`}
                      />
                    ) : (
                      <video controls>
                        <source src={`${s3_url + banner.image_url}`} type="video/mp4" />
                      </video>
                    )}
                  </div>
                  <StyledLabel>
                    <label>
                      <strong>Title</strong>
                    </label>
                    <br />
                    {banner.title}
                    <br />
                    <label>
                      <strong>Description</strong>
                    </label>
                    <br />
                    {banner.description}
                  </StyledLabel>
                  <Button color="green" icon="edit" onClick={() => onEditClick(banner)}>
                    Edit
                  </Button>
                  <Button color="red" icon="trash" onClick={() => onDelete(banner)}>
                    Delete
                  </Button>
                </StyledContact>
                <hr />
                {/* <Divider /> */}
              </>
            );
          }
        })}
    </StyledContainer>
  );
};

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

const StyledLabel = styled.div`
   {
    padding: 12px;
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

const StyledContact = styled.div`
   {
    width: 100%;
    display: flex;
    justify-content: left;
    flex-gap: 2;
    position: relative;
    // border-bottom: 1px solid grey;
  }
`;

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

const StyledEditContainer = styled.div`
   {
    display: flex;
    justify-content: left;
    padding: 15px;
    flex-direction: column;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;
export default withAuth(AdminBanners);
