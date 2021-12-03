import React from 'react';
import styles from "./SearchInput.module.scss"
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '../../../components'

const SearchInput = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchGroup}>
        <label className={styles.label}>
          <div className={styles.faSearch}>
            <FontAwesomeIcon size="14" faicon={"faSearch"}/>
          </div>
          <input
            type="text"
            className={[styles.search, styles.input].join(' ')}
            placeholder='利用名稱搜尋'
            onChange={props.filtered}
            value={props.value}/>
        </label>
        <div
          className={[styles.faTimesBlock, props.value.length > 0 ? '' : styles.faTimesBlockHide].join(' ')}
          onClick={props.reset}>
          <FontAwesomeIcon faicon={"faTimesCircle"}/>
        </div>
      </div>
      <div className={styles.close} onClick={props.closed}>
        <FontAwesomeIcon faicon={"faTimes"}/>
      </div>
    </div>
  )
};

export default SearchInput;
