import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import addTaskAtom from '../../recoil/addTaskAtom';
import editTaskAtom from '../../recoil/editTaskAtom';
import todoData from '../../recoil/todoData';
const EditTask = () => {
    const [addTaskOverLay, setAddTaskOverLay] = useRecoilState(addTaskAtom);
    const [todoApiData, setTodoApiData] = useRecoilState(todoData);
    const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);

    const titleRef = useRef(null);
    const descRef = useRef(null);
    const editTaskHandler = (e) => {
        e.preventDefault();
        const data = {
            id: selectedEditTask?.id,
            title : titleRef?.current?.value,
            desc : descRef?.current?.value,
        }
        fetch('http://127.0.0.1:8000/update_task',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
            setAddTaskOverLay(false);
            setTodoApiData(data?.todo_data);
        }).catch((error) => {console.log("Error", error);});
    };
  return (
    <div className='add-task-container'>
    <div className='add-task-content'>
      <h1>Edit Task</h1>
      <div>
          <form onSubmit={editTaskHandler} className='add-form'>
          <input type="text" placeholder='Title' ref={titleRef} defaultValue={selectedEditTask?.title}/>
          <textarea cols='30' rows='10' placeholder='Description' ref={descRef} defaultValue={selectedEditTask?.desc}></textarea>
          <button type='submit'>Edit</button>
          </form>
      </div>
    </div>
  </div>
  )
}

export default EditTask
