import React from "react";
import styles from "./Footer.module.scss";

const footer = ({ style, children }) => {
  return (
    <div style={style ? style : {}} className={styles.container}>
      {children}
    </div>
  );
};

export default footer;
