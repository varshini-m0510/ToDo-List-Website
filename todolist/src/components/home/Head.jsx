import React, { useEffect }from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userInfoAtom from '../../recoil/userInfoAtom';
import addTaskAtom from '../../recoil/addTaskAtom';

const Head = (props) => {
  // Global variables
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [addTaskOverLay, setAddTaskOverLay] = useRecoilState(addTaskAtom);

  useEffect(() => {
    console.log(addTaskOverLay)
  }, [addTaskOverLay])
  
  const navigate = useNavigate();
  return (
    <header>
    <div className='home-header-container'>
        <h2 className='header-logo-text'>ToDoX</h2>
        <div className='btn-container'>
        <button className='new-task-btn' onClick={() => {
          if(addTaskOverLay){
            setAddTaskOverLay(null)
          }else{
            setAddTaskOverLay(true)
          }
        }}>
            <span>
            <AddRoundedIcon fontSize='large'/>
            </span>{" "}New
        </button>
        <button className='new-task-btn' onClick={() => {
          localStorage?.clear();
          setUserInfo(false);
          navigate('/signin');
        }}>
          <LogoutRoundedIcon fontSize='large'/>
        </button>
        </div>
    </div>
  </header>
  )
}

export default Head;

