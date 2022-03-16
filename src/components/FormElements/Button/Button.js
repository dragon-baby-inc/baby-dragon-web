import React from "react";
import styles from "./Button.module.scss";

function Button({ style, children, disabled, clicked, color, btnClass }) {
  if (!color) {
    color = "green";
  }

  const colors = {
    green: styles.green,
    gold: styles.gold,
  };
  return (
    <button
      style={style ? style : {}}
      disabled={disabled}
      onClick={clicked}
      className={[styles.button, btnClass, colors[color]].join(" ")}
    >
      {children}
    </button>
  );
}

export default Button;
