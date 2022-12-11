import { isAuthenticated } from '@/helpers/auth';
import React, { FC, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import SignInForm from '../../../components/admin/forms/signin';
import { useRouter } from 'next/router';
import NewPasswordForm from '@/components/admin/forms/new-password-form';

const NewPassword = () => {
  const history = useRouter()
  
  return (
    <div>
      <Container>
            <NewPasswordForm />
      </Container>
    </div>
  );
};

export default NewPassword;
