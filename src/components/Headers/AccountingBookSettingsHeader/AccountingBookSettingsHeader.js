import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./AccountingBookSettingsHeader.module.scss";
import PageHeader from "../PageHeader/PageHeader";

function AccountingBookSettingsHeader({ scrollInfo, group }) {
  const [small, setSmall] = useState(false);
  const { group_id, accounting_book_id } = useParams();

  if (scrollInfo) {
    if (scrollInfo.y.value > 50 && !small) {
      setSmall(true);
    } else if (scrollInfo.y.value === 0 && small) {
      setSmall(false);
    }
  }

  let classes = [styles.header];
  let iconClasses = [styles.icon, styles.barsIcon];
  let nameClasses = [styles.name];
  let innerBlockClasses = [styles.innerBlock];
  if (small) {
    classes.push(styles.small);
    iconClasses.push(styles.small);
    nameClasses.push(styles.small);
    innerBlockClasses.push(styles.small);
  }

  return (
    <PageHeader
      faicon="faChevronLeft"
      link={`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/payments/index`}
      color="black"
    >
      設定
    </PageHeader>
  );
}

export default AccountingBookSettingsHeader;
//         <TopLeftIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books`} color={themeColors.gold900} faicon='faHome' style={{fontSize: '20px'}}/>
