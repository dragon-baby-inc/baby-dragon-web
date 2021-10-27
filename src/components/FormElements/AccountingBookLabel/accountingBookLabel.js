import React from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import './accountingBookLabel.scss'
import { useHistory } from "react-router-dom";
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon } from '../../index'
import Moment from 'react-moment';
import 'moment/locale/zh-tw';

const AccountingBookLabel = (props) => {
  const history = useHistory();
  let object = props.object

  const calendar = {
    sameDay: '[今日]',
    lastDay: '[昨日]',
    sameElse: 'YYYY/MM/DD',
    nextWeek: 'YYYY/MM/DD',
    lastWeek: 'YYYY/MM/DD',
  }

  const handleClicked = () => {
    history.push(`accounting_books/${object.uuid}/payments`)
  }

  return (
    <>
      <label onClick={handleClicked} className={`group-menu-label group-menu-checkbox-label group-menu-accounting-book`}>
        {
          props.editMode ?
            <div className='group-menu-checkbox'>
              <input
                checked={props.checked}
                onChange={props.changed}
                type="checkbox"
                value={ object.id }
              />
              <span className="checkmark"></span>
            </div>:
            <div className='group-menu-radio'>
              <input
                checked={props.checked}
                type="checkbox"
                value={ object.id }
              />
            </div>
        }
        <div className={`group-menu-payment-block`}>
          { object.current ?
            <FontAwesomeIcon style={{ fontSize: "20px", marginRight: "10px" }} faicon='faBookOpen' color={themeColors.gold900}/>
            :
            <FontAwesomeIcon style={{ fontSize: "20px", marginRight: "10px" }} faicon='faBookOpen' color={themeColors.gray400}/>
          }
          <div className='group-menu-username'>
            <div className='description'>
              { object.name }
            </div>
            <div className='message'>
              建立日期：<Moment calendar={calendar} local locale="zh-tw">{object.created_at}</Moment>
            </div>
          </div>
          { object.current ?
            <>
              <div className={`col-4 group-menu-amount`}>
                預設帳本
              </div>
            </>
            : null
          }
          <FontAwesomeIcon style={{ fontSize: "10px", margin: "0px 15px" }} faicon='faChevronRight' color={themeColors.gray900}/>
        </div>
      </label>
    </>
  )
};

export default AccountingBookLabel;
