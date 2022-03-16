import React from "react";
import Loader from "react-spinners/SyncLoader";
import { themeColors } from "../../constants";
import styles from "./FullPageLoader.module.scss";

function FullPageLoader() {
  return (
    <div className={styles.container}>
      <Loader
        color={themeColors.gray500}
        css={{ background: "transparent", backgroundColor: "transparent" }}
      />
    </div>
  );
}

export default FullPageLoader;
