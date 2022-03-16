import React from "react";
import styles from "./Separater.module.scss";

const separater = ({ name, style }) => {
  return (
    <div className={styles.container}>
      <div className={styles.separater} style={style ? style : {}}>
        {" "}
      </div>
    </div>
  );
};

export default separater;
