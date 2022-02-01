import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Container, Typography, Box, Stack, Avatar } from '@mui/material';
import { FormControl, Select, Button, IconButton, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';


// type FormInputs = {
//   profile: string;
//   name: string;
//   category: string;
//   email: string;
//   phone: number;
//   address: string;
//   latitude: number;
//   longitude: number;
//   password: string;
//   confirm: string;
// };

// type FileChangeEvent = {
//   target: HTMLInputElement;
// }

const EmployeeCreate = () => {
  let css = Styles();
  const { register, formState, handleSubmit, getValues } = useForm({
    mode: "onChange"
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  const [image, setImage] = useState();

  const handleChangeProfile = (event) => {
    const target = event.target;
    const fileUpload = target.files[0];
    setImage(URL.createObjectURL(fileUpload));
    // console.log(fileUpload);
  };


  return (
    <div className={css.employeeCreate}>
      <Box className={css.employeeList}>
        <Container maxWidth="xs">
          <Typography variant="h5" className={css.headttl}>
            New Employee
          </Typography>
          <form className={css.employeeForm} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" alignItems="center" spacing={2} className={css.profile}>
              <Avatar className={css.profileAvatar} src={String(image)} {...register("profile")}>
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
            <FormControl fullWidth className={css.formGroup}>
              <TextField
                InputLabelProps={{
                  className: css.labelColor
                }}
                InputProps={{
                  className: css.inputColor
                }}
                type="text"
                label="Name"
                variant="outlined"
                size="small"
                {...register("name", { required: true, pattern: /^[a-zA-Z _]+$/i, })}
              />
              {errors.name && <span className={css.txtError}>Name is required*</span>}
            </FormControl>
            <FormControl fullWidth className={css.formGroup}>
              <Select native className={css.selectBox}
                size="small"
                {...register("category", { required: true, })}
              >
                <option value="">Select...</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Select>
              {errors.category && <span className={css.txtError}>Select Name is required*</span>}
            </FormControl>
            <FormControl fullWidth className={css.formGroup}>
              <TextField
                InputLabelProps={{
                  className: css.labelColor
                }}
                InputProps={{
                  className: css.inputColor
                }}
                type="email"
                label="Email"
                variant="outlined"
                size="small"
                {...register("email", { required: true, pattern: /^([\w.-]+)@([\w-]+\.)+([\w]{2,})$/i, })}
              />
              {errors.email && <span className={css.txtError}>Email is required*</span>}
            </FormControl>
            <FormControl fullWidth className={css.formGroup}>
              <TextField
                InputLabelProps={{
                  className: css.labelColor
                }}
                InputProps={{
                  className: css.inputColor
                }}
                type="tel"
                label="Phone Number"
                variant="outlined"
                size="small"
                {...register("phone", { required: true, pattern: /^[0-9]+$/i, })}
              />
              {errors.phone && <span className={css.txtError}>Phone number must be number*</span>}
            </FormControl>
            <FormControl fullWidth className={css.formGroup}>
              <TextField
                InputLabelProps={{
                  className: css.labelColor
                }}
                InputProps={{
                  className: css.inputColor
                }}
                type="text"
                label="Address"
                variant="outlined"
                size="small"
                {...register("address", { required: true, pattern: /^[a-zA-Z _?(,'")]+$/i, })}
              />
              {errors.address && <span className={css.txtError}>Address is required*</span>}
            </FormControl>
            <FormControl fullWidth className={css.formGroup}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Stack className={css.location} direction="row">
                  <IconButton color="inherit">
                    <LocationOnIcon className={css.profileIcon} />
                  </IconButton>
                  <Stack className={css.labelColor}>Home</Stack>
                </Stack>
                <Stack>
                  <TextField
                    InputLabelProps={{
                      className: css.labelColor
                    }}
                    InputProps={{
                      className: css.inputColor
                    }}
                    type="text"
                    label="Latitude"
                    variant="outlined"
                    size="small"
                    {...register("latitude", { required: true })}
                  />
                  {errors.latitude && <span className={css.txtError}>is required*</span>}
                </Stack>
                <Stack>
                  <TextField
                    InputLabelProps={{
                      className: css.labelColor
                    }}
                    InputProps={{
                      className: css.inputColor
                    }}
                    type="text"
                    label="Longitude"
                    variant="outlined"
                    size="small"
                    {...register("longitude", { required: true })}
                  />
                  {errors.longitude && <span className={css.txtError}>is required*</span>}
                </Stack>
              </Stack>
            </FormControl>
            <FormControl fullWidth className={css.formGroup}>
              <TextField
                InputLabelProps={{
                  className: css.labelColor
                }}
                InputProps={{
                  className: css.inputColor
                }}
                type="password"
                label="Password"
                variant="outlined"
                size="small"
                {...register("password", { required: true, pattern: /[A-Za-z]{3}/, })}
              />
              {errors.password && <span className={css.txtError}>Password is required*</span>}
            </FormControl>
            <FormControl fullWidth className={css.formGroup}>
              <TextField
                InputLabelProps={{
                  className: css.labelColor
                }}
                InputProps={{
                  className: css.inputColor
                }}
                type="password"
                label="Confirm Password"
                variant="outlined"
                size="small"
                {...register("confirm", {
                  required: 'Confirm Password is required*',
                  pattern: /[A-Za-z]{3}/,
                  validate: value =>
                    value === getValues('password') || "Passwords must match",
                })}
              />
              {errors.confirm && <span className={css.txtError}>{errors.confirm.message}</span>}
            </FormControl>
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
  employeeCreate: {
    padding: '20px 0',
    backgroundColor: 'rgba(145,232,228)',
  },
  employeeList: {
    width: '95%',
    margin: '0 auto',
    backgroundColor: 'rgba(245,248,251)',
    borderRadius: '7px',
    boxShadow: '0px 3px 3px -2px rgba(0 0 0 / 20%), 0px 3px 4px 0px rgba(0 0 0 / 14%), 0px 1px 8px 0px rgba(0 0 0 / 12%)',
  },
  employeeForm: {
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

export default EmployeeCreate;