import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Stack, Avatar, Paper } from '@mui/material';
import { Button } from '@mui/material';
// import { FormControl, Select, Button, IconButton, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

import { storageDb } from '../../Services/Firebase';
// import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable } from "firebase/storage";


const UploadImageFile = () => {
  let css = Styles();
  const { register, formState, handleSubmit } = useForm({
    mode: "onChange"
  });
  const { errors } = formState;

  const [image, setImage] = useState();
  const onSubmit = (data) => {
    // const docRef = addDoc(collection(firestoreDb, "users"), {
    //   name: data.name, email: data.email, age: data.age,
    // });
    const file = data.image[0];
    const storageDbRef = ref(storageDb, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageDbRef, file);
    // console.log(data);
    alert(uploadTask, 'Upload is Successfull');
  };

  const handleChangeProfile = (event) => {
    const target = event.target;
    const fileUpload = target.files[0];
    setImage(URL.createObjectURL(fileUpload));
    // console.log(fileUpload);
  };


  return (
    <div className={css.uploadImageFile}>
      <Box className={css.uploadImageFileList} maxWidth="sm" component={Paper} elevation={3}>
        <Container maxWidth="xs">
          <Typography variant="h5" className={css.headttl}>
            Upload Image File
          </Typography>
          <form className={css.uploadImageFileForm} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" alignItems="center" spacing={2} className={css.profile}>
              <Avatar className={css.profileAvatar} src={String(image)} >
                <AccountCircleIcon color="primary" className={css.profileIcon} />
              </Avatar>
              <Stack>
                <label htmlFor="contained-button-file" className={css.btnFile}>
                  <Input type="file"
                    multiple
                    accept="image/*"
                    {...register("image")}
                    onChange={handleChangeProfile}
                  />
                  Choose Profile
                </label>
              </Stack>
            </Stack>
            <Stack>
              <Button type="submit" className={css.btnSubmit}>
                Create
              </Button>
            </Stack>
          </form>
        </Container>
      </Box>
    </div>
  )
}

// Style Css Codes
const Input = styled('input')({
  // display: 'none',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  width: '100%',
  fontSize: '31px',
  textAlign: 'center',
  filter: 'alpha(opacity=0)',
  opacity: '0',
  outline: 'none',
  background: 'white',
  cursor: 'inherit',
  display: 'block',
});

const Styles = makeStyles({
  uploadImageFile: {
    padding: '30px 0',
    backgroundColor: 'rgba(145,232,228)',
  },
  uploadImageFileList: {
    margin: '0 auto',
  },
  uploadImageFileForm: {
    padding: '10px 0 20px',
  },
  profile: {
    flexWrap: 'wrap',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  profileAvatar: {
    width: '50px!important',
    height: '50px!important',
    backgroundColor: 'rgba(245,248,251)!important',
    boxShadow: '0px 3px 3px -2px rgba(0 0 0 / 20%), 0px 3px 4px 0px rgba(0 0 0 / 14%), 0px 1px 8px 0px rgba(0 0 0 / 12%)',
  },
  btnFile: {
    position: 'relative',
    overflow: 'hidden',
    padding: '5px 15px',
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.75',
    letterSpacing: '0.02857em',
    borderRadius: '30px!important',
    color: 'rgba(118,127,213)!important',
    border: '1px solid rgba(118,127,213)!important',
    backgroundColor: 'rgba(245,248,251)!important',
    'text-transform': 'capitalize!important',
  },
  profileIcon: {
    fontSize: '2.5rem!important',
  },
  profileTxt: {
    borderRadius: '30px!important',
    color: 'rgba(118,127,213)!important',
    border: '1px solid rgba(118,127,213)!important',
    backgroundColor: 'rgba(245,248,251)!important',
    'text-transform': 'capitalize!important',
  },
  headttl: {
    padding: '15px 0',
    textAlign: 'center',
    color: 'rgba(118,127,213)',
  },
  formGroup: {
    marginBottom: '20px!important',
  },
  labelColor: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'rgba(118,127,213)!important',
  },
  inputColor: {
    color: 'rgba(140,148,219)!important',
  },
  txtError: {
    display: 'block',
    padding: '5px',
    color: '#d32f2f',
  },
  location: {
    alignItems: 'center',
    marginRight: '10px',
  },
  selectBox: {
    color: 'rgba(118,127,213)!important',
  },
  btnSubmit: {
    width: '30%',
    marginLeft: 'auto!important',
    color: '#FFFFFF!important',
    borderRadius: '5px!important',
    backgroundColor: 'rgba(118,127,213)!important',
    'text-transform': 'capitalize!important',
  },
});

export default UploadImageFile;