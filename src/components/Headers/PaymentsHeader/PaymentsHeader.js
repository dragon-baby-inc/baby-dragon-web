import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./PaymentsHeader.module.scss";
import { TopRightIcon, Svg } from "../../index";
import { PageHeader, Star } from "../../index";

function PaymentsHeader({
  paymentSize,
  index,
  selectAll,
  handleSelectAllClick,
  editMode,
  accountingBookDetails,
  handleSmallChange,
  loading,
}) {
  /* eslint-disable no-unused-vars */
  const [showDisclamier, setShowDisclaimer] = useState(false);
  const { group_id, accounting_book_id } = useParams();

  useEffect(() => {
    if (accountingBookDetails.current !== undefined) {
      setShowDisclaimer(!accountingBookDetails.current);
    }
  }, [accountingBookDetails]);

  const disclaimerClosed = () => {
    setShowDisclaimer(false);
  };

  let classes = [styles.header];
  let iconClasses = [styles.icon, styles.barsIcon];
  let nameClasses = [styles.name];
  let innerBlockClasses = [styles.innerBlock];

  return (
    <div>
      <PageHeader
        faicon="faChevronLeft"
        link={`/liff_entry/groups/${group_id}/accounting_books`}
      >
        {accountingBookDetails.name}
        <Star
          solid={accountingBookDetails.current}
          style={{ paddingLeft: "4px", position: "relative", bottom: "1px" }}
        />

        <TopRightIcon
          style={{ fontSize: "20px", right: 58 }}
          link={`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/log_messages`}
        >
          <Svg icon="time" size="24" className="black" />
        </TopRightIcon>
        <TopRightIcon
          style={{ fontSize: "20px", right: 20 }}
          link={`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/settings`}
        >
          <Svg icon="setting" size="24" className="black" />
        </TopRightIcon>
      </PageHeader>
    </div>
  );
}

export default PaymentsHeader;
