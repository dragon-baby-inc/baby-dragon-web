import React from "react";
import styles from "./AmountInput.module.scss";

const AmountInput = ({
  name,
  userImage,
  id,
  changed,
  value,
  placeholder,
  type,
  valid,
  invalidFeedback,
  disabled,
  hideLabel,
}) => {
  let labelClasses = [styles.label];
  if (valid === false) {
    labelClasses.push(styles.invalid);
  }
  return (
    <div className={styles.container}>
      <div className="group-menu-image-block">
        {userImage ? (
          <img
            className="group-menu-userimage"
            src={userImage}
            alt="user_image"
          />
        ) : (
          <img
            className="group-menu-userimage"
            src="https://storage.googleapis.com/baby-dragon/public/dummy_user_L.png"
            alt="user_image"
          />
        )}
      </div>
      <div className={styles.innerRight}>
        <div className={styles.name}>{name}</div>
        <label className={labelClasses.join(" ")}>
          {hideLabel ? null : <div className={styles.name}>{name}</div>}
          <input
            disabled={disabled}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              changed(id, e.target.value);
            }}
            className={styles.input}
            type={type}
          />
        </label>
      </div>
      {valid === false ? (
        <div className={styles.invalidFeedback}>{invalidFeedback}</div>
      ) : null}
    </div>
  );
};

export default AmountInput;
