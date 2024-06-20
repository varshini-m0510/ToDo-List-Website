import React, { useEffect } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import searchTextAtom from '../../recoil/searchTextAtom';
import { useRecoilState } from 'recoil';
const SearchBar = () => {
  const [inputData, setIputData] = useRecoilState(searchTextAtom)
  
  useEffect(() => {
    console.log(inputData);
  }, [inputData])
  
  return (
    <div className='search-container'>
      <input type="text" className='search-bar' placeholder='Search here' value={inputData} onChange={(e) => setIputData(e.target.value)}/>
      <div className='search-icon'>
        <SearchRoundedIcon fontSize='large' />
      </div>
    </div>
  )
}

export default SearchBar
