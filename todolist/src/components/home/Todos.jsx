import React, { useEffect } from 'react';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { useRecoilState } from 'recoil';
import searchTextAtom from '../../recoil/searchTextAtom';
import todoData from '../../recoil/todoData';
import activeFilter from '../../recoil/activeFilter';
import editTaskAtom from '../../recoil/editTaskAtom';
import filterDataAtom from '../../recoil/filterDataAtom';
// const Todos = (props) => {
//   const [inputData, setIputData] = useRecoilState(searchTextAtom)

//   return (
//     <div className='todo-main-container'>
//       <div>
//         {props?.apiData
//           ?.filter((filtered_data) => {
//             const title = filtered_data?.title || '';
//             const lowerInput = (inputData || '').toString().toLowerCase();
//             const lowerTitle = title.toString().toLowerCase();

//             return lowerInput === '' || lowerTitle.includes(lowerInput);
//           })
//           ?.map((data, index) => {
//             return (
//             <div key={index} className='todo-card'>
//                 <div>
//                     <div className='checkbox'></div>
//                 </div>
//                 <div className='todo-content-container'>  
//                     <div className='todo-card-header'>
//                         <h2 className='todo-title'>{data?.title}</h2>
//                         <div className='icon-container'>
//                             <ArchiveRoundedIcon className='archive'/>
//                             <ModeEditOutlineRoundedIcon className='edit'/>
//                             <DeleteOutlinedIcon className='delete'/>
//                         </div>
//                     </div>
//                     <p className='todo-desc'>{data?.desc}</p>
//                 </div>
//             </div>
//             );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Todos;


const Todos = () => {
  //global variables
  const [todoApiData, setTodoApiData] = useRecoilState(todoData);
  const [activeFilterValue, setActiveFilterValue] = useRecoilState(activeFilter);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);

  //local variables
  const [inputData, setInputData] = useRecoilState(searchTextAtom);

  useEffect(() => {
    // Check if inputData is false or not a string, set it to an empty string
    if (inputData === false || typeof inputData !== 'string') {
      setInputData('');
    }
  }, [inputData, setInputData]);

  const filteredItems = todoApiData?.filter((filtered_data) => {
    const title = filtered_data?.title || '';
    const lowerInput = (inputData && typeof inputData === 'string') ? inputData.toString().toLowerCase() : '';
    const lowerTitle = title.toString().toLowerCase();

    return lowerInput === '' || lowerTitle.includes(lowerInput);
  });

  return (
    <div className='todo-main-container'>
      <div>
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((data, index) => (
            <div key={index} className='todo-card'>
              <div>
                <div onClick={() => {
                      const bodyData = {
                        id: data?.id,
                      };
                       fetch('http://127.0.0.1:8000/complete_task',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyData)
                    })
                    .then((response) => response.json())
                    .then((res) =>{
                        console.log(res);
                        setTodoApiData(res?.todo_data);
                        setFilterData(res?.stats);
                    }).catch((error) => {console.log("Error", error);});
                    }} className={`${data?.status === "Completed" ? "checkbox-active": "checkbox"}`}></div>
              </div>
              <div className='todo-content-container'>
                <div className='todo-card-header'>
                  <h2 
                  className={`${data?.status === "Completed" ? "completed-todo-title":""} todo-title`}>{data?.title}</h2>
                  <div className='icon-container'>
                    <ArchiveRoundedIcon className='archive' onClick={() => {
                      const bodyData = {
                        id: data?.id,
                      };
                       fetch('http://127.0.0.1:8000/archieved_task',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyData)
                    })
                    .then((response) => response.json())
                    .then((res) =>{
                        console.log(res);
                        setTodoApiData(res?.todo_data);
                        setFilterData(data?.stats);
                    }).catch((error) => {console.log("Error", error);});
                    }}/>
                    <ModeEditOutlineRoundedIcon className='edit' onClick={() => {
                      setSelectedEditTask({
                        id: data?.id,
                        title: data?.title,
                        desc: data?.desc,
                      })
                    }}/>
                    <DeleteOutlinedIcon className='delete' onClick={() => {
                      const bodyData = {
                        id: data?.id,
                      };
                       fetch('http://127.0.0.1:8000/delete_task',{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyData)
                    })
                    .then((response) => response.json())
                    .then((res) =>{
                        console.log(res);
                        setTodoApiData(res?.todo_data);
                        setFilterData(data?.stats);
                    }).catch((error) => {console.log("Error", error);});
                    }}/>
                  </div>
                </div>
                <p className='todo-desc'>{data?.desc}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Todos;