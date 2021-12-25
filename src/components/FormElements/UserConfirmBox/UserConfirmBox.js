import React from 'react'
import { TextInput, ConfirmBox, IconSwappableView } from '../../index'
import { imageUrls } from '../../../constants'

const UserConfirmBox = ({
  title,
  confirmed,
  canceled,
  userName,
  setUserName,
  imageUserId,
  setUserImageId
}) => {

  const _styles = {
    root: {
      backgroundColor: 'white',
      margin: 0,
      padding: '0px 22vw',
      overflow: 'hidden',
    },
  };

  return(
    <ConfirmBox
      title={title}
      confirmed={confirmed}
      canceled={canceled}>
      <div style={{ backgroundColor: 'white', width: '100%' }}>
        <IconSwappableView
          imageSize="80px"
          styles={_styles}
          changed={setUserImageId}
          initial={imageUserId}
          icons={imageUrls}/>
        <div style={{ padding: '24px 16px' }}>
          <TextInput
            key='name'
            faicon="farCreditCard"
            disabled={false}
            placeholder={'輸入名稱'}
            name={'名稱'}
            style={{ width: '100%', margin: '0px' }}
            changed={(value) => setUserName({ value: value, valid: value.length > 0 })}
            value={userName.value === undefined ? '' : userName.value}
            valid={userName.valid}
            invalidFeedback="不可為空，不可同名，12字內"
            type='text'
          />
        </div>
      </div>
    </ConfirmBox>
  )
}

export default UserConfirmBox;
