import { isAuthenticated } from '@/helpers/auth';
import React, { FC, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import SignInForm from '../../../components/admin/forms/signin';
import { useRouter } from 'next/router';

const Signin = () => {
  const history = useRouter()
  useEffect(() => {
    if(isAuthenticated()){
      history.push("/admin");
    }
  },[])
  return (
    <div>
      <Container>
        <SignInForm />
      </Container>
    </div>
  );
};

export default Signin;
