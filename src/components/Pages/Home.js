import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Container, Paper } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, } from '@mui/material';
import { Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserForm from '../Forms/EditUserForm';

import { firestoreDb, storageDb } from '../../Services/Firebase';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";


const Home = () => {
  let css = Styles();
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  // handleClose Modal
  const handleClose = () => {
    setOpenModal(false);
  };

  // handleEditShow
  const handleEditShow = (user) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  // handleEditUpdate
  const handleEditUpdate = async (user) => {
    const userUpdateDoc = doc(firestoreDb, 'todos', user.id);
    try {
      await updateDoc(userUpdateDoc, {
        imageUrl: user.imageUrl,
        name: user.name,
        email: user.email,
        age: user.age,
      });
      setOpenModal(false);
      alert((userUpdateDoc, 'Update is Successfull !!'));
    } catch (error) {
      // console.log(error.message);
      alert((error, 'Update is not Successfull !!'));
    }
  };

  // handleDelete
  const handleDelete = async (user) => {
    // await deleteDoc(doc(firestoreDb, "users", id));
    const userDeleteDoc = doc(firestoreDb, 'todos', user.id);
    try {
      await deleteDoc(userDeleteDoc);
      const desertRef = ref(storageDb, user.imageUrl);
      await deleteObject(desertRef).then(() => {
        // setUsers(users.filter((image) => image !== user));
        alert("Picture is deleted successfully!!");
      }).catch((error) => {
        console.log(error.message);
      });
      alert((userDeleteDoc, 'Delete is Successfully!!'));
    } catch (error) {
      // console.log(error.message);
      alert((error, 'Delete is not Successfully!!'));
    }
  };

  // Firestore Get Database
  const usersCollectionRef = collection(firestoreDb, 'todos');
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);


  return (
    <Box className={css.userFormLists}>
      <Container maxWidth="md">
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Images</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} >
                  {/* <TableCell>{user.id}</TableCell> */}
                  <TableCell><img width="130" height="100" src={user.imageUrl} alt={user.name} /></TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={() => { handleEditShow(user) }}
                        variant="outlined" color="primary" startIcon={<EditIcon />}>
                        Edit
                      </Button>
                      <Button
                        // onClick={handleDelete}
                        // onClick={() => { handleDelete(user.id); }}
                        onClick={() => { handleDelete(user); }}
                        variant="contained" color="secondary" endIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {openModal && <EditUserForm
        openModal={openModal}
        handleClose={handleClose}
        handleEditUpdate={handleEditUpdate}
        currentUser={currentUser}
      />}
    </Box>
  );
};

const Styles = makeStyles({
  userFormLists: {
    padding: '40px 0',
    background: '#E7EBF0',
  },
});

export default Home;