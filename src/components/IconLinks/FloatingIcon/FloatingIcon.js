import React from "react";
import styles from "./FloatingIcon.module.scss";

function FloatingIcon({
  containerStyle,
  containerInlineStyle,
  children,
  avatarStyle,
}) {
  return (
    <div className={containerStyle} style={containerInlineStyle}>
      <div className={[avatarStyle, styles.avatar].join(" ")}>{children}</div>
    </div>
  );
}

export default FloatingIcon;
