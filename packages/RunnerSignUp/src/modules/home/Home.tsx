import { Button, Stack, TextField, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AnimatedStack from '~/shared/components/AnimatedStack';
import posthog from 'posthog-js';

interface RegisterFormValues {
  name: string;
  email: string;
}

const Home = () => {
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const methods = useForm<RegisterFormValues>({
    reValidateMode: 'onBlur',
    mode: 'onChange',
  });

  const formSubmit: SubmitHandler<RegisterFormValues> = async ({
    name,
    email,
  }) => {
    const id = String(Math.round(Math.random() * 1000000));
    posthog.identify(id, {
      email,
      name,
      userId,
    });
    setUserId(id);
    setSubmitted(true);
    return () => posthog.reset();
  };

  return (
    <Stack
      padding="16px"
      width={'100vw'}
      height={'100vh'}
      alignItems={'center'}
      pt={12}
    >
      <Typography variant="h1" color="primary" mb={4}>
        Runner Signup
      </Typography>
      {!submitted ? (
        <AnimatedStack keyId="form">
          <FormProvider {...methods}>
            <Typography
              variant="h2"
              color="primary"
              textAlign={'center'}
              mb={3}
            >
              LaPorte Marathon
            </Typography>
            <Form onSubmit={methods.handleSubmit(formSubmit)}>
              <TextField
                {...methods.register('name', { required: true })}
                label={'What’s your name?*'}
                name="name"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                {...methods.register('email', { required: true })}
                fullWidth
                label={'What’s your email?*'}
                name="email"
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!methods.formState.isValid}
                sx={{ width: '60%', height: '50px' }}
              >
                Sign Up
              </Button>
            </Form>
          </FormProvider>
        </AnimatedStack>
      ) : (
        <AnimatedStack keyId="thankYou">
          <Typography variant="h2" color="primary" textAlign={'center'} mb={3}>
            Thank you
          </Typography>
          <Container>
            <ShirtButton
              variant="outlined"
              disabled={!userId}
              href={`http://localhost:3001/?phid=${userId}`}
              // target="_blank"
            >
              Get Shirt
            </ShirtButton>
          </Container>
        </AnimatedStack>
      )}
    </Stack>
  );
};

export default Home;

const Form = styled('form')(({ theme }) => ({
  width: '60%',
  height: '40vh',
  padding: '32px 80px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.primary.main}`,
}));

const Container = styled(Stack)(({ theme }) => ({
  width: '60%',
  height: '40vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.primary.main}`,
}));

const ShirtButton = styled(Button)(({ theme }) => ({
  width: '60%',
  height: '50px',
  borderColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.dark,
  '&:hover': {
    borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.dark,
  },
})) as typeof Button; // Mui type limitation
