import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import './accountingBookLabel.scss'
import { Collapse } from 'react-collapse';
import { useHistory } from "react-router-dom";
import { themeColors } from '../../../constants/globalColors'
import { Button, FontAwesomeIcon } from '../../index'
import Moment from 'react-moment';
import 'moment/locale/zh-tw';

const AccountingBookLabel = (props) => {
  const history = useHistory();
  const [ collapseOpen , setCollapseOpen ] = useState(false)
  let object = props.object
  let activeClass = collapseOpen ? 'active' : ''

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
      <label onClick={handleClicked} className={`group-menu-label group-menu-checkbox-label group-menu-accounting-book ${activeClass}`}>
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
        <div className={`group-menu-payment-block ${activeClass}`}>
          { object.current ?
            <FontAwesomeIcon style={{ fontSize: "20px", marginRight: "10px" }} faIcon='faBookOpen' color={themeColors.gold900}/>
            :
            <FontAwesomeIcon style={{ fontSize: "20px", marginRight: "10px" }} faIcon='faBookOpen' color={themeColors.gray400}/>
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
              <div className={`col-4 group-menu-amount ${activeClass}`}>
                預設帳本
              </div>
            </>
            : null
          }
          <FontAwesomeIcon style={{ fontSize: "10px", margin: "0px 15px" }} faIcon='faChevronRight' color={themeColors.gray900}/>
        </div>
      </label>
    </>
  )
};

export default AccountingBookLabel;
