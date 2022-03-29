import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Collapse } from "react-collapse";
import { useCookies } from "react-cookie";
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "../../../styleSheets/userSummaryLabel.scss";
import { Separater } from "../../../components/FormElements";
import { Image } from "../../../components";
import { useHistory } from "../../../hooks";

const UserSummaryLabel = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(true);
  const { group_id, accounting_book_id } = useParams();
  const { navigateTo } = useHistory();
  let object = props.object;
  let activeClass = collapseOpen ? "active" : "";
  /* eslint-disable no-unused-vars */
  const [cookies, setCookie] = useCookies(["name"]);

  const handlePaidBackClick = (object, allo) => {
    let payment = {
      id: null,
      description: "還款",
      amount: allo.amount,
      paid_back: true,
      allocation_type: "amount",
      ower_id: object.payer_id,
      payer_id: allo.ower_id,
    };

    setCookie("payment", payment, { path: "/" });
    navigateTo("paidBackPaymentPage", {
      group_id,
      accounting_book_id,
      payment,
    });
  };

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true);
    } else {
      setCollapseOpen(false);
    }
  };

  let i = 0;
  const debts = object.debts.map((allo) => {
    i += 1;
    return (
      <div key={i} className="allocation">
        <div className="allocationInner">
          <span className="name"> {allo.ower_display_name} </span>
          <span className="amount">
            {props.currency_symbol}
            {allo.amount}
          </span>
        </div>
        <div
          className="paidbackBtn"
          onClick={() => handlePaidBackClick(object, allo)}
        >
          還款
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={`modal`}>
        <label
          className={`group-menu-label group-menu-checkbox-label group-menu-summary ${activeClass}`}
        >
          {props.editMode ? (
            <div className="group-menu-checkbox">
              <input
                checked={props.checked}
                onChange={props.changed}
                type="checkbox"
                value={object.payer_id}
              />
              <span className="checkmark"></span>
            </div>
          ) : (
            <div className="group-menu-radio">
              <input
                onChange={handleLabelOnCheck}
                checked={props.checked}
                type="checkbox"
                value={object.payer_id}
              />
            </div>
          )}
          <div className={`group-menu-image-block ${activeClass}`}>
            <Image
              imageUrl={object.payer_image_url}
              defaultImage="user"
              size="40px"
            />
          </div>
          <div className={`group-menu-payment-block ${activeClass}`}>
            <div className="group-menu-username">
              <div className="description">{object.payer_display_name}</div>
            </div>
            <div className="group-menu-amount">應收</div>
          </div>
        </label>
        <Separater style={{ margin: "0px 20px" }} />
      </div>

      <Collapse isOpened={true}>
        <div className={`user-summary collapse`}>
          <div className="allocations">{debts}</div>
          <div className="allocation buttons">
            <div className="btn edit">
              總計 {props.currency_symbol}
              {object.total}
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default UserSummaryLabel;
