import React, { useState, useEffect } from "react";
import styles from "./Views.module.scss";
import { NavLink } from "react-router-dom";

const Views = ({ group_id, id }) => {
  const [disabled, setDisabled] = useState(true);
  const links = [
    {
      href: `/liff_entry/groups/${group_id}/accounting_books/${id}/payments/index`,
      text: "編輯歷史",
    },
    {
      href: `/liff_entry/groups/${group_id}/accounting_books/${id}/payments/summary`,
      text: "分帳建議",
    },
  ];

  useEffect(() => {
    if (group_id) {
      setDisabled(false);
    }
    // eslint-disable react-hooks/exhaustive-deps
  }, [group_id]);

  let disabledClass = disabled ? styles.disabled : "";
  let iconLinks = links.map((link) => {
    return (
      <NavLink
        key={link.text}
        exact
        to={link.href}
        activeClassName={styles.activeStyle}
        className={[disabledClass, styles.icon].join(" ")}
      >
        {link.children}
        <span> {link.text} </span>
      </NavLink>
    );
  });

  return (
    <div className={styles.bg}>
      <div className={styles.icons}>{iconLinks}</div>
    </div>
  );
};

export default Views;
