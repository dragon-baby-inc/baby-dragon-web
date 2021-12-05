import React from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import './accountingBookAddLabel.scss'
import { useHistory } from "react-router-dom";
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon, ColorBlock } from '../../index'
import Moment from 'react-moment';
import 'moment/locale/zh-tw';

const AccountingBookAddLabel = (props) => {
  const history = useHistory();
  let object = props.object

  const handleClicked = () => {
    props.clicked()
  }

  return (
    <>
      <label onClick={props.clicked} className={`group-menu-label group-menu-checkbox-label group-menu-accounting-book`}>
        <ColorBlock>
          <FontAwesomeIcon faicon="faPlus" color="white" style={{ fontSize: '15px' }}></FontAwesomeIcon>
        </ColorBlock>
        <div className={`group-menu-payment-block`}>
          <div className='group-menu-username'>
            <div className='description' style={{ color: themeColors.gold700 }}>
              新增帳本
            </div>
          </div>
        </div>
      </label>
    </>
  )
};

export default AccountingBookAddLabel;