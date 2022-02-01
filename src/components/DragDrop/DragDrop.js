import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Paper, Container } from '@mui/material';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';


const DragDrop = () => {
  const dataTaskTodos = [
    {
      id: '1',
      Task: 'Keelie Kent',
      Due_Date: '25-May-2020',
    },
    {
      id: '2',
      Task: 'Fix Styling',
      Due_Date: '26-June-2020',
    },
    {
      id: '3',
      Task: 'Handle Door Specs',
      Due_Date: '27-July-2020',
    },
    {
      id: '4',
      Task: 'Gail Vaughn',
      Due_Date: '23-Aug-2020',
    },
    {
      id: '5',
      Task: 'Gary Welch',
      Due_Date: '05-Sept-2021',
    },
    {
      id: '6',
      Task: 'MacKensie Dennis',
      Due_Date: '20-Dec-2021',
    },
    {
      id: '7',
      Task: 'Kamal Shaffer',
      Due_Date: '30-Jan-2022',
    },
  ];

  const dataTaskProgress = [
    {
      id: '8',
      Task: 'Fallon Mays',
      Due_Date: '20-Feb-2022',
    },
    {
      id: '9',
      Task: 'Autumn Wagner',
      Due_Date: '25-March-2022',
    },
  ];

  const taskTodoLists = {
    taskTodo: {
      title: 'Task Todo',
      items: dataTaskTodos,
    },
    taskProgress: {
      title: 'Task Progress',
      items: dataTaskProgress,
    },
    taskDone: {
      title: 'Task Done',
      items: [],
    },
  };

  const [columns, setColumns] = useState(taskTodoLists);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ py: 4, px: 2, }}>
        <Container maxWidth="xl">
          <Typography variant='h4'>React Drag & Drop Demo</Typography>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            <Stack>
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <Droppable key={columnId} droppableId={columnId}>
                    {(provided, snapshot) => (
                      <Box component={Paper} elevation={3}
                        key={index}
                        snapshot={snapshot}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <Typography variant='h6'>{column.title}</Typography>
                        <List>
                          {column.items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided) => (
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
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
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </List>
                      </Box>
                    )}
                  </Droppable>
                );
              })}
            </Stack>
          </DragDropContext>
        </Container>
      </Box>
    </ThemeProvider>
  );
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


export default DragDrop;
