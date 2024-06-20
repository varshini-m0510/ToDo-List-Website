import React, { useEffect, useState } from 'react';
import { filterEndPoints } from '../../helper/filter';
import todoData from '../../recoil/todoData';
import { useRecoilState } from 'recoil';
import activeFilter from '../../recoil/activeFilter';
import filterDataAtom from '../../recoil/filterDataAtom';
const Filters = () => {
  //Local variable
  const [activeFilterValue, setActiveFilterValue] = useRecoilState(activeFilter);
  const [todoApiData, setTodoApiData] = useRecoilState(todoData);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);

  //function
  useEffect(() => {
    console.log("FilterData");
    console.log(filterData);
  },[filterData]);
  
  return (
    <div>
      <div className='filter-container'>
        {filterData?.map((data,index)=>{
            return(
                <div key={index} className='filter-btn-container' onClick={() => setActiveFilterValue(data?.label)}>
                    <button  className={`${activeFilterValue === data?.label ? "active-filter": ""}`} onClick={() => {
                       fetch('http://127.0.0.1:8000/' + filterEndPoints[index]?.endpoint,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then((response) => response.json())
                    .then((data) =>{
                        setTodoApiData(data?.todo_data);
                        setFilterData(data?.stats);
                    }).catch((error) => {alert(error);});
                    }}>
                        <h3>{data?.label}</h3>
                        <p  className={`${activeFilterValue === data?.label ? "active-filter-value": ""}`}>{data?.value}</p>
                    </button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Filters
