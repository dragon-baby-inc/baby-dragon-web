import React, { useState } from "react";
import styles from "./SelectLabel.module.scss";
import { FontAwesomeIcon, Drawer } from "../../../components";

const SelectLabel = ({ children, changed, checked, value, drawerChildren }) => {
  const [drawerActive, setDrawerActive] = useState(false);

  const handleClicked = () => {
    setDrawerActive(!drawerActive);
  };

  return (
    <>
      <label className={styles.label} onClick={handleClicked}>
        {children}
        <div className={styles.icon}>
          <FontAwesomeIcon
            style={{ fontSize: "14px" }}
            faicon="faChevronDown"
          />
        </div>
      </label>

      <Drawer open={drawerActive} closed={() => setDrawerActive(false)}>
        {drawerChildren}
      </Drawer>
    </>
  );
};

export default SelectLabel;
