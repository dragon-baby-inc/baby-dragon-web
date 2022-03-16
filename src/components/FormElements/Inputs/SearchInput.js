import React from "react";
import styles from "./SearchInput.module.scss";
import { FontAwesomeIcon, Svg } from "../../../components";

const SearchInput = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchGroup}>
        <label className={styles.label}>
          <div className={styles.faSearch}>
            <FontAwesomeIcon faicon={"faSearch"} />
          </div>
          <input
            type="text"
            className={[styles.search, styles.input].join(" ")}
            placeholder="利用名稱搜尋"
            onChange={props.filtered}
            value={props.value}
          />
        </label>
        <div
          className={[
            styles.faTimesBlock,
            props.value.length > 0 ? "" : styles.faTimesBlockHide,
          ].join(" ")}
          onClick={props.reset}
        >
          <FontAwesomeIcon faicon={"faTimesCircle"} />
        </div>
      </div>
      {props.checkbox ? (
        <div className={styles.checkboxClose} onClick={props.closed}>
          完成
        </div>
      ) : (
        <div className={styles.close} onClick={props.closed}>
          <Svg icon="cancel" size="24" className="gray900" />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
