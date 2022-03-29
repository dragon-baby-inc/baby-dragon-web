import React, { useState, useEffect } from "react";
import styles from "./IconsList.module.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "../../index";

const IconsList = ({ group_id, id }) => {
  const [disabled, setDisabled] = useState(true);
  const links = [
    // {
    //   href: `/liff_entry/groups/${group_id}/accounting_books`,
    //   faIcon: faBook,
    //   text: '帳本列表'
    // },
    {
      href: `/liff_entry/groups/${group_id}/accounting_books/${id}/payments`,
      faIcon: "faList",
      text: "帳款列表",
    },
    {
      href: `/liff_entry/groups/${group_id}/accounting_books/${id}/summary`,
      faIcon: "faClipboard",
      text: "分帳建議",
    },
    {
      href: `/liff_entry/groups/${group_id}/accounting_books/${id}/log_messages`,
      faIcon: "faHistory",
      text: "編輯歷史",
    },
    {
      href: `/liff_entry/groups/${group_id}/accounting_books/${id}/settings`,
      faIcon: "faBook",
      text: "帳本設定",
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
        <FontAwesomeIcon faicon={link.faIcon} />
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

export default IconsList;
