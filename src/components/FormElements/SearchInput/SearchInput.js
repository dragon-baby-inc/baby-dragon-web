import React from 'react';
import "./SearchInput.scss"
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

const SearchInput = (props) => {
  return (
    <div className='search-group'>
      <label className="mt-0">
        <div className="fa-search">
          <FontAwesomeIcon icon={faSearch} color={themeColors.gray600}/>
        </div>
        <input type="text" className='search' placeholder='利用名稱搜尋' onChange={props.filtered} value={props.value}/>
      </label>
      <div className='px-2 fa-times-block' onClick={props.reset}>
        <FontAwesomeIcon icon={faTimes}/>
      </div>
    </div>
  )
};

export default SearchInput;
