import React, { useState } from "react";
import styles from "./ConfirmBox.module.scss";
import { Backdrop, FullPageLoader, Separater } from "../../../components";

const ConfirmBox = ({
  title,
  children,
  confirmed,
  canceled,
  confirm_text,
  cancel_text,
}) => {
  const [disableForm, setDisableForm] = useState(false);

  const handleCanceled = (e) => {
    e.preventDefault();
    setDisableForm(true);
    canceled(setDisableForm);
  };
  const handleConfirmed = () => {
    setDisableForm(true);
    confirmed(setDisableForm);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.children}>{children}</div>
        <Separater style={{ margin: "0px" }} />
        <div className={styles.btnGroup}>
          <button
            disabled={disableForm}
            className={[styles.button, styles.cancel].join(" ")}
            onClick={handleCanceled}
          >
            {cancel_text ? cancel_text : "取消"}
          </button>
          <button
            disabled={disableForm}
            className={[styles.button, styles.confirm].join(" ")}
            onClick={handleConfirmed}
          >
            {confirm_text ? confirm_text : "確認"}
          </button>
        </div>
      </div>
      <Backdrop clicked={handleCanceled} />
      {disableForm ? <FullPageLoader /> : null}
    </>
  );
};

export default ConfirmBox;
