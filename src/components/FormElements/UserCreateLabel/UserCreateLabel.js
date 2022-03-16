import React from "react";
import styles from "./UserCreateLabel.module.scss";
import { ColorBlock } from "../index";
import { Svg } from "../../index";
import { themeColors } from "../../../constants";

const UserCreateLabel = ({ children, clicked, value }) => {
  return (
    <>
      <label className={styles.label} onClick={clicked}>
        <div className={styles.leftBox}>
          <div className={styles.colorBlock}>
            <ColorBlock></ColorBlock>
          </div>
          新增虛擬成員
        </div>
        <Svg size="24" icon="add" className="gold700" />
      </label>
    </>
  );
};

export default UserCreateLabel;
