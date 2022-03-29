import React from "react";
import { themeColors } from "../../../constants";
import { FontAwesomeIcon } from "../../index";
import styles from "./Star.module.scss";

const Star = ({ clicked, solid, style }) => {
  return (
    <div style={style ? style : {}} className={styles.star} onClick={clicked}>
      <FontAwesomeIcon
        faicon={solid ? "fasFaStar" : "farFaStar"}
        style={{ fontSize: "16px", margin: "0px 2px" }}
        color={solid ? themeColors.green500 : themeColors.gray500}
      />
    </div>
  );
};

export default Star;
