import React from 'react';
import { Grid, Container } from '@mui/material';
import RegisterForm from 'components/Auth/RegisterForm';
import AuthWelcome from 'components/Auth/AuthWelcome';

export default function RegisterPage() {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} md={6}>
          <AuthWelcome />
        </Grid>
        <Grid item xs={12} md={6}>
          <RegisterForm />
        </Grid>
      </Grid>
    </Container>
  );
}
