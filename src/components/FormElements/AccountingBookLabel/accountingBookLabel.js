import React from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import './accountingBookLabel.scss'
import { useHistory } from "react-router-dom";
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon, Image, Star } from '../../index'
import Moment from 'react-moment';
import 'moment/locale/zh-tw';

const AccountingBookLabel = (props) => {
  const history = useHistory();
  let object = props.object

  const calendar = {
    sameDay: '[今日]',
    lastDay: '[昨日]',
    sameElse: 'YYYY.MM.DD',
    nextWeek: 'YYYY.MM.DD',
    lastWeek: 'YYYY.MM.DD',
  }

  const handleClicked = () => {
    history.push(`accounting_books/${object.uuid}/payments/index`)
  }

  const handleSetAsCurrent = (e) => {
    props.handleSetCurrent(object.uuid)
    e.stopPropagation()
    e.preventDefault()
    return false
  }

  return (
    <>
      <label onClick={handleClicked} className={`group-menu-label group-menu-checkbox-label group-menu-accounting-book`}>
        <Image size='56px' circle/>
        <div className={`group-menu-payment-block`}>
          <div className='group-menu-username'>
            <div className='description'>
              { object.name }
            </div>
            <div className='message'>
              建立日期：<Moment calendar={calendar} local locale="zh-tw">{object.created_at}</Moment>
            </div>
          </div>
          { props.current ?
            <>
              <div onClick={handleSetAsCurrent} className={`col-4 group-menu-amount`}>
                預設帳本
                <Star solid/>
              </div>
            </>
            :
            <div onClick={handleSetAsCurrent} className={`col-4 group-menu-amount`}>
              <Star />
            </div>
          }
          <FontAwesomeIcon style={{ fontSize: "15px", margin: "0px 10px" }} faicon='faChevronRight' color={themeColors.gray900}/>
        </div>
      </label>
    </>
  )
};

export default AccountingBookLabel;
