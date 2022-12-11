import { isAuthenticated } from '@/helpers/auth';
import React, { FC, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import SignInForm from '../../../components/admin/forms/signin';
import { useRouter } from 'next/router';
import NewPasswordForm from '@/components/admin/forms/new-password-form';
import ForgetPasswordForm from '@/components/admin/forms/forget-password';

const NewPassword = () => {
  const history = useRouter()
  
  return (
    <div>
      <Container>
            <ForgetPasswordForm />
      </Container>
    </div>
  );
};

export default NewPassword;
