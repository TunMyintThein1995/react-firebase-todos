import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormGroup, FormLabel, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';


const EditUserForm = (props) => {
  const { handleSubmit } = useForm({
    mode: "onChange",
  });

  const [user, setUser] = useState(props.currentUser);
  const onSubmit = async () => {
    props.handleEditUpdate(user);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };


  return (
    <ThemeProvider theme={theme}>
      <Dialog open={props.openModal}>
        <DialogTitle>Welcome to EditUser Form !</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogContent>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <TextField
                  name="name"
                  type="text"
                  label="Name"
                  size='small'
                  value={user.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </FormGroup>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                  size='small'
                  value={user.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </FormGroup>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3, }}>
              <FormGroup>
                <FormLabel>Age</FormLabel>
                <TextField
                  name="age"
                  type="number"
                  label="Age"
                  size='small'
                  value={user.age}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormGroup>
                <Button onClick={props.handleClose} variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained">Update</Button>
              </FormGroup>
            </FormControl>
          </DialogContent>
        </form>
      </Dialog>
    </ThemeProvider>
  )
};

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          textAlign: 'center',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          width: '80%',
          margin: '0 auto',
          ".MuiFormGroup-root": {
            justifyContent: 'space-between',
            flexDirection: 'unset',
            alignItems: 'center',
            ".MuiFormLabel-root": {
              width: '30%',
              fontWeight: '900',
            },
            ".MuiFormControl-root": {
              width: '60%',
            },
            ".MuiButton-root": {
              "&:first-of-type": {
                marginRight: '20px',
              },
            },
          },
        },
      },
    },
  },
});

export default EditUserForm;
