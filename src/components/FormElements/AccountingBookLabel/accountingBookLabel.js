import React, { useState } from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import './accountingBookLabel.scss'
import { Collapse } from 'react-collapse';
import { useHistory } from "react-router-dom";
import FormatString from "../../../utilities/FormatString"
import { themeColors } from '../../../constants/globalColors'
import Button from '../Button/Button'

import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/zh-tw';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyFontAwesomeIcon from '../../../utilities/FontAwesomeIcon'
import { faEdit } from '@fortawesome/fontawesome-free-solid'
import { faTrash } from '@fortawesome/fontawesome-free-solid'

const AccountingBookLabel = (props) => {
  const history = useHistory();
  const [ collapseHeight , setcollapseHeight ] = useState(0)
  const [ collapseOpen , setCollapseOpen ] = useState(false)
  let object = props.object
  let formatString = new FormatString();
  let activeClass = collapseOpen ? 'active' : ''

  const calendar = {
    sameDay: '[今日]',
    lastDay: '[昨日]',
    sameElse: 'YYYY/MM/DD',
    nextWeek: 'YYYY/MM/DD',
    lastWeek: 'YYYY/MM/DD',
  }

  const handleLabelOnCheck = (e) => {
    if (e.target.checked) {
      setCollapseOpen(true)
    } else {
      setCollapseOpen(false)
    }
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
            <MyFontAwesomeIcon style={{ fontSize: "20px", marginRight: "10px" }} faIcon='faBookOpen' color={themeColors.gold900}/>
            :
            <MyFontAwesomeIcon style={{ fontSize: "20px", marginRight: "10px" }} faIcon='faBookOpen' color={themeColors.gray400}/>
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
          <MyFontAwesomeIcon style={{ fontSize: "10px", margin: "0px 15px" }} faIcon='faChevronRight' color={themeColors.gray900}/>
        </div>
      </label>
      <Collapse isOpened={false}>
        <div className='book collapse'>
          <div className='btn-group'>
            <Button className='icon' btnClass='icon delete'>
              <FontAwesomeIcon icon={faTrash}/> 刪除
            </Button>
            <Button className='icon' btnClass='icon switch'>
              <FontAwesomeIcon icon={faEdit}/> 設為預設
            </Button>
          </div>
        </div>
      </Collapse>
    </>
  )
};

//             <Button className='icon' btnClass='icon' clicked={() => { history.push(`accounting_books/${object.uuid}/payments`) }}>
//               <FontAwesomeIcon icon={faEdit}/> 看帳
//             </Button>
export default AccountingBookLabel;
