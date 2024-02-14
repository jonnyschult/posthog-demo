import { useForm, Controller, FormProvider } from 'react-hook-form';
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  InputLabel,
  FormControl,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import AnimatedStack from '~/shared/components/AnimatedStack';

interface CompanyFormValues {
  corporateSponsor: string;
  shirtSize: string;
}

const Home = () => {
  const [submitted, setSubmitted] = useState(false);
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const phid = params.get('phid');
    params.delete('phid');
    const newUrl = `${window.location.pathname}`;
    window.history.pushState({}, '', newUrl);

    posthog.identify(phid ?? undefined, {
      userId: phid,
    });
    return () => posthog.reset();
  }, []);

  const methods = useForm<CompanyFormValues>({
    reValidateMode: 'onBlur',
    mode: 'onChange',
    defaultValues: {
      corporateSponsor: '',
      shirtSize: 'sm',
    },
  });

  const formSubmit = async ({ corporateSponsor }: CompanyFormValues) => {
    posthog.group(
      'corporate sponsor',
      corporateSponsor.replace(' ', '_').toLocaleLowerCase() + '_1234_id',
      {
        date_joined: new Date(),
      },
    );
    setSubmitted(true);
  };

  return (
    <Stack
      padding="16px"
      width={'100vw'}
      height={'100vh'}
      alignItems={'center'}
      pt={12}
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Typography variant="h1" color="white" mb={4}>
        Runner Shirts
      </Typography>
      {!submitted ? (
        <AnimatedStack keyId="form">
          <FormProvider {...methods}>
            <Typography variant="h2" color="white" textAlign={'center'} mb={3}>
              LaPorte Marathon
            </Typography>
            <Form onSubmit={methods.handleSubmit(formSubmit)}>
              <Input
                {...methods.register('corporateSponsor')}
                label="Who is your corporate sponsor?*"
                name="corporateSponsor"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <WhiteInputLabel id="shirt-size-label">
                  What’s your shirt size?*
                </WhiteInputLabel>
                <Controller
                  name="shirtSize"
                  control={methods.control}
                  render={({ field }) => (
                    <DropDown
                      {...field}
                      labelId="shirt-size-label"
                      label="What’s your shirt size?*"
                    >
                      <MenuItem value="sm">Small</MenuItem>
                      <MenuItem value="md">Medium</MenuItem>
                      <MenuItem value="lg">Large</MenuItem>
                      <MenuItem value="xl">Extra Large</MenuItem>
                      <MenuItem value="xxl">Extra Extra Large</MenuItem>
                    </DropDown>
                  )}
                />
              </FormControl>
              <SubmitButton
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ width: '60%', height: '50px' }}
              >
                Submit
              </SubmitButton>
            </Form>
          </FormProvider>
        </AnimatedStack>
      ) : (
        <AnimatedStack keyId="thankYou">
          <Typography variant="h2" color="white" textAlign={'center'} mb={3}>
            Thank you
          </Typography>
        </AnimatedStack>
      )}
    </Stack>
  );
};

export default Home;

const Form = styled('form')(({ theme }) => ({
  width: '60%',
  height: '40vh',
  padding: '32px 64px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.common.white}`,
}));

const Input = styled(TextField)({
  input: { color: 'white' },
  '& label': { color: 'white' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'white' },
  },
  '&:hover .MuiOutlinedInput-root fieldset': {
    borderColor: 'white',
  },
  '& .MuiOutlinedInput-root.Mui-focused fieldset label': {
    borderColor: 'white',
  },
  '& .MuiOutlinedInput-root.Mui-active fieldset label': {
    borderColor: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  marginBottom: 16,
});

const DropDown = styled(Select)({
  color: 'white',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
  marginBottom: 24,
});

const WhiteInputLabel = styled(InputLabel)({
  color: 'white !important',
  '&.Mui-focused': {
    color: 'white',
  },
});

const SubmitButton = styled(Button)(({ theme }) => ({
  color: 'white',
  borderColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
  },
}));
