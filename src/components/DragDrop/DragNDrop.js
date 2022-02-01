import React, { useState, useRef, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Paper, Container } from '@mui/material';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';


const DragNDrop = ({ data }) => {
  const dragItem = useRef();
  const dragItemNode = useRef();

  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const handletDragStart = (e, item) => {
    // console.log('Starting to drag', item);

    dragItem.current = item;
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, targetItem) => {
    // console.log('Entering a drag target', targetItem);
    const currentItem = dragItem.current;
    if (e.target !== dragItemNode.current) {
      // console.log('Target is NOT the same as dragged item');
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].items.splice(targetItem.index, 0, newList[currentItem.grpI].items.splice(currentItem.index, 1)[0]);
        dragItem.current = targetItem;
        // localStorage.setItem('List', JSON.stringify(newList));
        return newList;
      })
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragItemNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragItemNode.current = null;
  };

  // const getStyles = (item) => {
  //   const currentItem = dragItem.current;
  //   if (currentItem.grpI === item.grpI && currentItem.index === item.index) {
  //     return "dnd-item current";
  //   }
  //   return "dnd-item";
  // };

  if (list) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ py: 4, px: 2, }}>
          <Container maxWidth="xl">
            <Typography variant='h4'>React Hook Drag & Drop Demo</Typography>
            <Stack>
              {list.map((grp, grpI) => {
                return (
                  <Box component={Paper} elevation={3}
                    key={grp.id}
                    onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, index: 0 }) : null}
                  >
                    <Typography variant='h6'>{grp.title}</Typography>
                    <List>
                      {grp.items.map((item, index) => (
                        <ListItem key={index}
                          draggable={true}
                          onDragStart={(e) => handletDragStart(e, { grpI, index })}
                          onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, index }) } : null}
                        // className={dragging ? getStyles({ grpI, index }) : "dnd-item"}
                        >
                          <Box component={Paper} elevation={2}>
                            <ListItemText>{item.Task}</ListItemText>
                            <ListItemText components="span" color="primary">
                              {new Date(item.Due_Date).toLocaleDateString('en-us', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit',
                              })}
                            </ListItemText>
                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                );
              })}
            </Stack>
          </Container>
        </Box>
      </ThemeProvider>
    )
  } else { return null }
};

const theme = createTheme({
  typography: {
    h4: {
      marginBottom: '25px',
      textAlign: 'center',
    },
    h6: {
      padding: '10px 0',
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#45597E',
      backgroundColor: '#DBE2F4',
    },
  },
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          justifyContent: 'space-between',
          flexDirection: 'unset',
          ".MuiBox-root": {
            width: '30%',
            background: '#f3f3f3',
            borderRadius: '0',
            ".MuiList-root": {
              padding: '20px',
              ".MuiListItem-root": {
                padding: '0',
                marginBottom: '20px',
                cursor: 'grab',
                "&:last-of-type": {
                  marginBottom: '0',
                },
                ".MuiBox-root": {
                  width: '100%',
                  padding: '15px',
                  borderRadius: '5px',
                  background: '#FFF',
                  ".MuiListItemText-root": {
                    margin: '0',
                    color: '#45597E',
                    "&:first-of-type": {
                      marginBottom: '15px',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});


export default DragNDrop;