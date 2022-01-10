import React from 'react';
import "../../../styleSheets/Checkbox.scss";
import "../../../styleSheets/CustomInput.scss";
import './accountingBookLabel.scss'
import { useHistory } from "react-router-dom";
import { themeColors } from '../../../constants/globalColors'
import { FontAwesomeIcon, Image, Star, Svg } from '../../index'
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
    if (!props.disabled) {
      props.handleSetCurrent(object.uuid)
      e.stopPropagation()
    }
    e.preventDefault()
    return false
  }

  return (
    <>
      <label onClick={handleClicked} className={`group-menu-label group-menu-checkbox-label group-menu-accounting-book`}>
        <Image imageUrl={object.imageUrl} size='56px' circle/>
        <div className={`group-menu-payment-block`}>
          <div className='group-menu-username'>
            <div className='description'>
              { object.name }
            </div>
            <div className='message'>
              建立日期：<Moment calendar={calendar} local locale="zh-tw">{object.created_at}</Moment>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            { props.current ?
              <>
                <div className={`col-4 group-menu-amount`} style={{ minWidth: '76px' }}>
                  預設帳本
                  <Svg icon='favorateYes' size='24' clicked={handleSetAsCurrent}/>
                </div>
              </>
              :
              <div className={`col-4 group-menu-amount`}>
                <Svg icon='favorateNo' size='24' clicked={handleSetAsCurrent}/>
              </div>
            }
            <Svg icon='rightArrow' color='black'size='24' style={{ marginLeft: '10px' }}/>
          </div>
        </div>
      </label>
    </>
  )
};

export default AccountingBookLabel;
