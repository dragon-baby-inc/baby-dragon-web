import React, { useState, useEffect } from "react";
import FormatString from "../../../utilities/FormatString";
import { useCookies } from "react-cookie";
import styles from "./paymentCheckboxLabel.module.scss";
import { useParams } from "react-router-dom";
import Checkbox from "../Inputs/Checkbox";
import { Image } from "../../index";
import { Collapse } from "../../index";

import { useHistory } from "../../../hooks";

const PaymentCheckboxLabel = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const { navigateTo, navigate } = useHistory();
  /* eslint-disable no-unused-vars */
  const [_, setCookie] = useCookies([]);
  const { group_id, accounting_book_id } = useParams();
  const open = collapseOpen && !props.editMode;
  const [isChecked, setIsChecked] = useState(props.checked);

  useEffect(() => {
    setIsChecked(props.selectedPaymentIds.includes(object.id.toString()));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [props.selectedPaymentIds]);

  let object = props.object;
  let activeClass = open ? styles.active : "";
  let amount = object.amount;

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true);
    } else {
      setCollapseOpen(false);
    }
  };

  let i = 0;
  const allocations = object.allocations.map((allo) => {
    i += 1;
    return (
      <div key={i} className={[styles.allocation].join(" ")}>
        <div className={styles.allocationInner}>
          <span className={[styles.alloName].join(" ")}>
            {" "}
            {allo.ower_display_name}{" "}
          </span>{" "}
          <span className={[styles.alloAmount].join(" ")}>
            {props.currency_symbol}
            {allo.amount}
          </span>
        </div>
      </div>
    );
  });

  const handleDeleteClick = () => {
    props.deleted(object);
  };

  const handleEditClick = () => {
    navigate(
      `/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/payments/${object.id}/edit`
    );
  };

  const handlePaidBackEditClick = () => {
    let payment = {
      id: object.id,
      description: object.description,
      amount: object.amount,
      paid_back: true,
      allocation_type: "amount",
      payer_id: object.payer_id,
      ower_id: object.allocations[0].ower_id,
    };

    setCookie("payment", payment, { path: "/" });
    navigateTo("paidBackPaymentPage", {
      group_id,
      accounting_book_id,
      payment,
    });
  };

  const handleCheckboxChaned = (e) => {
    setIsChecked(e.target.checked);
    props.changed(e);
  };

  let paidBack = "";
  if (object.paid_back) {
    paidBack = styles.paidBack;
  }

  return (
    <>
      <div className={[styles.container, activeClass, paidBack].join(" ")}>
        <label
          className={[`${activeClass} ${paidBack}`, styles.label].join(" ")}
        >
          {props.editMode ? (
            <Checkbox
              checked={isChecked}
              value={object.id.toString()}
              changed={handleCheckboxChaned}
            />
          ) : (
            <div className={[styles.checkbox].join(" ")}>
              <input
                onChange={handleLabelOnCheck}
                type="checkbox"
                value={object.id}
              />
            </div>
          )}
          <div className={[styles.image].join(" ")}>
            <Image imageUrl={object.payer_image_url} defaultImage="user" />
          </div>
          <div className={[styles.paymentBlock].join(" ")}>
            <div className={[styles.name].join(" ")}>
              <div className={[styles.description].join(" ")}>
                {object.paid_back
                  ? FormatString.sliceToLength(
                      `還 ${object.allocations[0].ower_display_name}`,
                      18,
                      ".."
                    )
                  : FormatString.sliceToLength(object.description, 18, "..")}
              </div>
              <div className={[styles.message].join(" ")}>
                {props.currency_symbol}
                {amount}
              </div>
            </div>
            <div className={[styles.amount].join(" ")}>
              <div className={[styles.description].join(" ")}>
                {object.paid_back
                  ? `${object.payer_display_name} 還款`
                  : object.payer_display_name}
              </div>
              <div className={[styles.message].join(" ")}>
                {object.allocations.length}人
              </div>
            </div>
          </div>
        </label>
      </div>
      <Collapse
        isOpened={open}
        initialStyle={
          open
            ? { height: "auto", overflow: "initial" }
            : { height: "0px", overflow: "hidden" }
        }
      >
        <div className={[`${paidBack}`, styles.paymentCollapse].join(" ")}>
          {object.paid_back ? null : (
            <div className={[styles.allocations].join(" ")}>{allocations}</div>
          )}
          <div className={[styles.buttons, paidBack].join(" ")}>
            <div onClick={handleDeleteClick} className={[styles.btn].join(" ")}>
              刪除
            </div>
            {object.paid_back ? null : (
              <div
                onClick={handleEditClick}
                className={[styles.btn, styles.edit].join(" ")}
              >
                編輯
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default PaymentCheckboxLabel;
