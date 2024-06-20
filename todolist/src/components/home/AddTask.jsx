import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import addTaskAtom from '../../recoil/addTaskAtom';
import todoData from '../../recoil/todoData';
const AddTask = () => {
    //Global variables
    const [addTaskOverLay, setAddTaskOverLay] = useRecoilState(addTaskAtom);
    const [todoApiData, setTodoApiData] = useRecoilState(todoData);
    const titleRef = useRef(null);
    const descRef = useRef(null);

    const addTaskHandler = (e) => {
        e.preventDefault();
        const data = {
            title : titleRef?.current?.value,
            desc : descRef?.current?.value,
        }
        fetch('http://127.0.0.1:8000/create_todo',{
            method: 'POST',
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
        <h1>New Task</h1>
        <div>
            <form onSubmit={addTaskHandler} className='add-form'>
            <input type="text" placeholder='Title' ref={titleRef}/>
            <textarea cols='30' rows='10' placeholder='Description' ref={descRef}></textarea>
            <button type='submit'>Add</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AddTask
