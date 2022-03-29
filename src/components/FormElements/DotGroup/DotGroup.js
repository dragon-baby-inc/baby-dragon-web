import React from "react";
import defaultStyles from "./DotGroup.module.scss";

const DotGroup = ({ dotSize, index, moduleStyles }) => {
  const dots = [];

  const _styles = moduleStyles ? moduleStyles : defaultStyles;

  for (let i = 0; i < dotSize; i++) {
    let dot =
      index === i ? (
        <li key={i} className={[_styles.dot, _styles.active].join(" ")}></li>
      ) : (
        <li key={i} className={_styles.dot}></li>
      );
    dots.push(dot);
  }
  return <ul className={_styles.dotGroup}>{dots}</ul>;
};

export default DotGroup;
