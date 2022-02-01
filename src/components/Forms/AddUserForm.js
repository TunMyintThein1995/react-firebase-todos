import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import { Box, Container, Paper } from '@mui/material';
import { FormControl, FormGroup, FormLabel, TextField, FormHelperText, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { firestoreDb, storageDb } from '../../Services/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const AddUserForm = () => {
  let css = Styles();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange"
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    const file = data.imageUrl[0];
    const storageDbRef = ref(storageDb, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageDbRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // console.log(error.message);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((imagedownloadURL) => {
          const usersCollectionRef = collection(firestoreDb, 'todos');
          addDoc(usersCollectionRef, {
            imageUrl: imagedownloadURL,
            name: data.name,
            email: data.email,
            age: data.age,
          });
          console.log('File available at', imagedownloadURL);
        });
      }
    );
    navigate("/");
    // console.log(data);
    alert(('AddUser is Successful !!'));
  };


  return (
    <ThemeProvider theme={theme}>
      <Box className={css.addUserForm} maxWidth="sm" component={Paper} elevation={3}>
        <Container maxWidth="xs">
          <Typography variant="h2">Welcome to AddUser Form !</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Image File</FormLabel>
                <TextField
                  type="file"
                  multiple
                  accept="image/*"
                  size='small'
                  variant="outlined"
                  {...register("imageUrl", { required: true, })}
                />
                {errors.imageUrl && <FormHelperText error>Profile is required*</FormHelperText>}
              </FormGroup>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <TextField
                  type="text"
                  label="Name"
                  size='small'
                  variant="outlined"
                  {...register("name", { required: true, pattern: /^[a-zA-Z _]+$/i, })}
                />
                {errors.name && <FormHelperText error>Name is required*</FormHelperText>}
              </FormGroup>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  label="Email"
                  size='small'
                  variant="outlined"
                  {...register("email", { required: true, pattern: /^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i, })}
                />
              </FormGroup>
              {errors.email && <FormHelperText error>Email is required*</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Age</FormLabel>
                <TextField
                  type="number"
                  label="Age"
                  size='small'
                  variant="outlined"
                  {...register("age", { required: true, })}
                />
              </FormGroup>
              {errors.age && <FormHelperText error>Age is required*</FormHelperText>}
            </FormControl>
            <FormControl>
              <Button type='submit' variant="contained">Submit</Button>
            </FormControl>
          </form>
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
    },
  },
  components: {
    MuiFormGroup: {
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
          flexDirection: 'unset',
          alignItems: 'center',
          ".MuiFormLabel-root": {
            width: '30%',
            fontWeight: '900',
          },
          ".MuiFormControl-root": {
            width: '60%',
            ".MuiFormLabel-root": {
              width: '100%',
              fontWeight: '500',
            },
          },
        },
      },
    },
  },
});

const Styles = makeStyles({
  addUserForm: {
    padding: '30px 0',
    margin: '30px auto 0',
  },
});

export default AddUserForm;