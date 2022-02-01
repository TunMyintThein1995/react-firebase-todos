import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Container, Paper, Stack, Link, List, ListItem } from '@mui/material';
import { FormControl, FormGroup, FormLabel, TextField, FormHelperText, Button } from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import WindowIcon from '@mui/icons-material/Window';
// import FacebookIcon from '@mui/icons-material/Facebook';

import { authDb, googleProvider, githubProvider, facebookProvider, microsoftProvider } from '../../Services/Firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, OAuthProvider } from 'firebase/auth';


const LoginForm = () => {
  let css = Styles();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange"
  });
  const { errors } = formState;

  const [userCurrent, setUserCurrent] = useState({});
  onAuthStateChanged(authDb, (user) => {
    setUserCurrent(user);
  });

  const onSubmit = async (user) => {
    try {
      const userLogin = await signInWithEmailAndPassword(
        authDb,
        user.email,
        user.password,
      );
      navigate("/");
      // console.log(user);
      alert((userLogin, 'Login is Successful!!'));
    } catch (error) {
      // console.log(error.message);
      alert(('Login is not Successful !!'));
    }
  };

  // GoogleAuthProvider
  const signInWithGoogleAuthProvider = () => {
    signInWithPopup(authDb, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  // GithubAuthProvider
  const signInWithGithubAuthProvider = () => {
    signInWithPopup(authDb, githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // ...
        navigate("/");
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  // MicrosoftOAuthProvider
  const signInWithMicrosoftOAuthProvider = () => {
    signInWithPopup(authDb, microsoftProvider)
      .then((result) => {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.

        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
        navigate("/");
      })
      .catch((error) => {
        // Handle error.
        console.log(error.message);
      });
  };

  // FacebookAuthProvider
  const signInWithFacebookAuthProvider = () => {
    signInWithPopup(authDb, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // ...
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(error.message);
        // ...
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={css.loginForm} maxWidth="sm" component={Paper} elevation={3}>
        <Container maxWidth="xs">
          <Typography variant="h2">Welcome to Login Form !</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  label="Email"
                  size='small'
                  variant="outlined"
                  {...register("email", { required: true, })}
                />
              </FormGroup>
              {errors.email && <FormHelperText error>Email is required*</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>PassWord</FormLabel>
                <TextField
                  type="password"
                  label="PassWord"
                  size='small'
                  variant="outlined"
                  {...register("password", { required: true, })}
                />
              </FormGroup>
              {errors.password && <FormHelperText error>Password is required*</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2, }}>
              <Button type='submit' size='large' variant="contained">Submit</Button>
            </FormControl>
          </form>
          <List>
            <ListItem>If you do not have an Account, Please Click<Link component="a" href='/register' underline="hover" color="primary">Register</Link></ListItem>
          </List>
          <Stack spacing={2}>
            <Button
              size='large'
              onClick={signInWithGoogleAuthProvider}
              variant="contained" color="primary" startIcon={<GoogleIcon />}>
              Login with Google
            </Button>
            <Button
              size='large'
              onClick={signInWithGithubAuthProvider}
              variant="contained" color="primary" startIcon={<GitHubIcon />}>
              Login with GitHub
            </Button>
            <Button
              size='large'
              onClick={signInWithMicrosoftOAuthProvider}
              variant="contained" color="primary" startIcon={<WindowIcon />}>
              Login with Microsoft
            </Button>
            {/* <Button
              size='large'
              onClick={signInWithFacebookAuthProvider}
              variant="contained" color="primary" startIcon={<FacebookIcon />}>
              Login with Facebook
            </Button> */}
          </Stack>
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
          ".MuiFormLabel-root": {
            marginBottom: '15px',
            fontWeight: '900',
          },
          ".MuiFormControl-root": {
            ".MuiFormLabel-root": {
              marginBottom: '0',
              fontWeight: '500',
            },
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '0',
          marginBottom: '18px',
          ".MuiListItem-root": {
            padding: '0',
            justifyContent: 'center',
            ".MuiLink-root": {
              marginLeft: '10px',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
});

const Styles = makeStyles({
  loginForm: {
    padding: '30px 0',
    margin: '30px auto',
  },
});

export default LoginForm;