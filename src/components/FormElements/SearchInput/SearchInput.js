import React from 'react';
import "./SearchInput.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SearchInput = (props) => {
  return (
    <div className='search-group'>
      <label className="mt-0">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input type="text" className='search' placeholder='利用名稱搜尋' onChange={props.filtered} value={props.value}/>
      </label>
      <div className='px-2'>
        <i className="fa fa-times" aria-hidden="true" onClick={props.reset}></i>
      </div>
    </div>
  )
};

export default SearchInput;
