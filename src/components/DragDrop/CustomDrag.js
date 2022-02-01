import React, { useEffect, useState } from 'react';
import DragNDrop from './DragNDrop';


const defaultData = [
  {
    id: '1', title: 'Task Todo',
    items: [
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
    ]
  },
  {
    id: '2', title: 'Task Progress',
    items: [
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
    ]
  },
  { id: '3', title: 'Task Done', items: [] }
];

const CustomDrag = () => {
  const [data, setData] = useState();
  useEffect(() => {
    if (localStorage.getItem('List')) {
      // console.log(localStorage.getItem('List'));
      setData(JSON.parse(localStorage.getItem('List')));
    } else {
      setData(defaultData);
    }
  }, [setData]);

  return (
    <div className="App">
      <DragNDrop data={data} />
    </div>
  );
};

export default CustomDrag;
