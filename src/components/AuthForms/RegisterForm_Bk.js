import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import { Box, Container, Stack, Link } from '@mui/material';
import { FormControl, FormGroup, FormLabel, TextField, FormHelperText, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { authDb } from '../../Services/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const RegisterForm = () => {
  let css = Styles();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange"
  });
  const { errors } = formState;

  const [users, setUsers] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = async () => {
    const { email, password, confirmPassword } = users;
    try {
      const userRegister = await createUserWithEmailAndPassword(
        authDb,
        email,
        password,
        confirmPassword,
      );
      navigate("/login");
      // console.log(userRegister);
      alert((userRegister, 'Register is Successful!!'));
    } catch (error) {
      // console.log(error.message);
      alert(('Register is not Successful !!'));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={css.registerForm}>
        <Container maxWidth="xs">
          <Typography variant="h2">Welcome to RegisterForm !</Typography>
          <form onSubmit={handleSubmit(onSubmit)} >
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <TextField
                  name='name'
                  type="text"
                  label="Name"
                  size='small'
                  variant="outlined"
                  required
                  onChange={handleInputChange}
                // {...register("name", { required: true, pattern: /^[a-zA-Z _]+$/i, })}
                />
              </FormGroup>
              {errors.name && <FormHelperText error>Name is required*</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <TextField
                  name='email'
                  type="email"
                  label="Email"
                  size='small'
                  variant="outlined"
                  required
                  onChange={handleInputChange}
                // {...register("email", { required: true, pattern: /^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i, })}
                />
              </FormGroup>
              {errors.email && <FormHelperText error>Email is required*</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>PassWord</FormLabel>
                <TextField
                  name='password'
                  type="password"
                  label="PassWord"
                  size='small'
                  variant="outlined"
                  required
                  onChange={handleInputChange}
                // {...register("password", { required: true, pattern: /[A-Za-z]{3}/, })}
                />
              </FormGroup>
              {errors.password && <FormHelperText error>PassWord is required*</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Confirm PassWord</FormLabel>
                <TextField
                  type="password"
                  label="Confirm PassWord"
                  size='small'
                  variant="outlined"
                  required
                  onChange={handleInputChange}
                // {...register("cpw", { required: true, pattern: /[A-Za-z]{3}/, })}
                />
              </FormGroup>
              {errors.cpw && <FormHelperText error>Confirm PassWord is required*</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <Button type='submit' variant="contained">Submit</Button>
            </FormControl>
          </form>
          <Stack>Already have an Account? <Link component="a" href='/login' underline="hover" color="primary">Log in</Link> </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  )
};

const theme = createTheme({
  typography: {
    h2: {
      marginBottom: '30px',
      fontSize: '1.5rem',
      fontWeight: '500',
      textAlign: 'center',
    },
  },
  components: {
    MuiFormGroup: {
      styleOverrides: {
        root: {
          label: {
            marginBottom: '15px',
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          flexDirection: 'unset',
          justifyContent: 'center',
          a: {
            marginLeft: '10px',
          },
        },
      },
    },
  },
});

const Styles = makeStyles({
  registerForm: {
    padding: '30px 0',
  },
});

export default RegisterForm;