import { API } from '@/../constants';
import Footer from '@/components/footer';
import ContactUs from '@/components/forms/conatctus';
import Page from '@/components/page';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import React, { FC, useEffect, useState } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { tw, css } from 'twind/css';
interface IProps {}

/**
 * @author
 * @function @Contact
 **/
const headerstyle = css`
  padding: 20px 50px;
  min-height : 90vh;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
const Contact: FC<IProps> = (props) => {
  const [contacts, setContacts] = useState({ email: '', telephone: '', whatsapp: '' });
  const preload = () => {
    axios
      .get(`${API}/contact-details`)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    preload();
  }, []);
  return (
    <div>
      <div>
        <NextSeo
          title="RF School - Comitted For Quality Education"
          description="RF School - Comitted For Quality Education"
        />
        <Header heading="RF SCHOOL" description="Comitted for quality education." />
        <main className={tw(headerstyle)}>
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <h1 className={tw('text-4xl font-bold')}>Get in touch</h1>
                <br />
                <div className={tw('flex')}>
                  <Icon size="big" name="mail" />
                  &nbsp; {contacts.email}
                </div>
                <br />
                <div className={tw('flex')}>
                  <Icon size="big" name="phone" />
                  &nbsp; {contacts.telephone}
                </div>
                <br />
                <div className={tw('flex')}>
                  <Icon size="big" name="whatsapp" />
                  &nbsp; {contacts.whatsapp}
                </div>
              </Grid.Column>
              <Grid.Column>
                <ContactUs />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
