import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Stack, Avatar, Button } from '@mui/material';
// import { FormControl, Select, IconButton, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

import { storageDb } from '../../Services/Firebase';
import { ref, uploadBytesResumable } from "firebase/storage";


const AddUploadFile = () => {
  let css = Styles();
  const [image, setImage] = useState();

  const formHandler = (e, file) => {
    e.preventDefault();
    if (!file) {
      const file = e.target[0].files[0];
      const storageDbRef = ref(storageDb, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageDbRef, file);
      alert(uploadTask, 'Upload is Successfull');
    } else {
      alert('Upload is not Successfull');
    }
  };

  const handleChangeProfile = (event) => {
    const target = event.target;
    const fileUpload = target.files[0];
    setImage(URL.createObjectURL(fileUpload));
    // console.log(fileUpload);
  };

  return (
    <div className={css.addUploadFile}>
      <Box className={css.addUploadFileList}>
        <Container maxWidth="xs">
          <Typography variant="h5" className={css.headttl}>
            Upload Image File
          </Typography>
          <form className={css.addUploadForm} onSubmit={formHandler}>
            <Stack direction="row" alignItems="center" spacing={2} className={css.profile}>
              <Avatar className={css.profileAvatar} src={String(image)}>
                <AccountCircleIcon color="primary" className={css.profileIcon} />
              </Avatar>
              <Stack>
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleChangeProfile} />
                  <Button className={css.profileTxt} variant="outlined" component="span">
                    Choose Profile
                  </Button>
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
  display: 'none',
});

const Styles = makeStyles({
  addUploadFile: {
    padding: '20px 0',
    backgroundColor: 'rgba(145,232,228)',
  },
  addUploadFileList: {
    width: '95%',
    margin: '0 auto',
    backgroundColor: 'rgba(245,248,251)',
    borderRadius: '7px',
    boxShadow: '0px 3px 3px -2px rgba(0 0 0 / 20%), 0px 3px 4px 0px rgba(0 0 0 / 14%), 0px 1px 8px 0px rgba(0 0 0 / 12%)',
  },
  addUploadForm: {
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

export default AddUploadFile;