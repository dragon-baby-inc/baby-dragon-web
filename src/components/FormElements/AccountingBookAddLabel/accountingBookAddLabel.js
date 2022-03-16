import React from "react";
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import "./accountingBookAddLabel.scss";
import { themeColors } from "../../../constants/globalColors";
import { Svg, ColorBlock } from "../../index";

const AccountingBookAddLabel = (props) => {
  return (
    <>
      <label
        onClick={props.clicked}
        className={`group-menu-label group-menu-checkbox-label group-menu-accounting-book`}
      >
        <ColorBlock>
          <Svg icon="add" size="24" className="white" />
        </ColorBlock>
        <div className={`group-menu-payment-block`}>
          <div className="group-menu-username">
            <div className="description" style={{ color: themeColors.gold700 }}>
              新增帳本
            </div>
          </div>
        </div>
      </label>
    </>
  );
};

export default AccountingBookAddLabel;
