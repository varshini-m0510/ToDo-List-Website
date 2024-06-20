import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import addTaskAtom from '../recoil/addTaskAtom';
import Head from '../components/home/Head'
import "./Home.css";
import SearchBar from '../components/home/SearchBar';
import Filters from '../components/home/Filters';
import Todos from '../components/home/Todos';
import AddTask from '../components/home/AddTask';
import apiDataAtom from '../recoil/apiDataAtom';
import todoData from '../recoil/todoData';
import editTaskAtom from '../recoil/editTaskAtom';
import EditTask from '../components/home/EditTask';
import filterDataAtom from '../recoil/filterDataAtom';
const Home = () => {
    const [addTaskOverLay, setAddTaskOverLay] = useRecoilState(addTaskAtom);
    const [apiData, setApiData] = useRecoilState(apiDataAtom);
    const [todoApiData, setTodoApiData] = useRecoilState(todoData);
    const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
    const [filterData, setFilterData] = useRecoilState(filterDataAtom);
    const homeData = {
        stats: [
            {label: "All",
                value: 10},
            {label: "Completed",   
                value: 4},
            {label: "In Progress",
                value: 6},
            {label: "Archieved",
                value: 2},
        ],
        todoData: [
            {
                title: "Title1",
                desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam error earum voluptates ea autem nihil neque eligendi molestiae non. Voluptate nesciunt dolores rem, et similique excepturi libero laboriosam ad cupiditate!",
                status: "Completed",
            },
            {
                title: "Title2",
                desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est facere placeat quibusdam eius soluta optio, veniam debitis corrupti delectus iste.",
                status: "In Progress",
            },
            {
                title: "Title3",
                desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, aliquam.",
                status: "Completed",
            },
            {
                title: "Title4",
                desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga adipisci error aperiam nesciunt consectetur a maxime? Porro iure aliquid recusandae, voluptatem suscipit ad fugit in minima nemo dolore cupiditate obcaecati!",
                status: "Archieved",
            }
        ]
    };

    //initial call to get apiData
    useEffect(() => {
        fetch('http://127.0.0.1:8000/initial_call',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
            setApiData(data);
            setTodoApiData(data?.todo_data);
            setFilterData(data?.stats);
        }).catch((error) => {alert(error);});
    }, [])
    
  return (
    <div className='relative'>
        {
            addTaskOverLay && (<div>
                {/* overlay */}
                <div className='add-overlay' onClick={() => setAddTaskOverLay(null)}></div>
                <AddTask />
            </div>)
        }
         {
            selectedEditTask && (<div>
                {/* overlay */}
                <div className='add-overlay' onClick={() => setSelectedEditTask(null)}></div>
                <EditTask />
            </div>)
        }
        <div className='home-container'>
            <Head />
            <SearchBar />
            <Filters />
            <Todos />
        </div>
    </div>
  )
}

export default Home;
