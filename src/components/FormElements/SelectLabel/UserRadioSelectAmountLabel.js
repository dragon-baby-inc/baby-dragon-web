import React, { useState, useEffect } from 'react';
import styles from './SelectLabel.module.scss'
import {
  Svg,
  Drawer,
  Image,
  RadioFilterSelect,
  TextInput
} from '../../../components'
import {
  createUserRadioLabel
} from '../../../generators/labelGenerator'
import {
  userImageUrls
} from '../../../constants'

const UserRadioSelectAmountLabel = ({
  users,
  amount,
  user,
  callback,
  style,
  valid,
  index,
  forceDrawerActive,
  deleted,
  deleteActive,
  invalidFeedback,
  invalidFeedbackStyle
}) => {
  const [drawerActive, setDrawerActive] = useState(forceDrawerActive)
  const [_valid, setValid] = useState(true)

  useEffect(() => {
    if (!valid) {
      setValid(amount ? amount.length > 0 : false)
    }
  }, [valid])

  const userSelectCallback = (object) => {
    setDrawerActive(false)
    if (callback) { callback(index, { user: object, amount: amount }) }
  }

  const amountCallback = (value) => {
    setValid(value.length > 0)
    if (callback) { callback(index, { user: user, amount: value }) }
  }

  const handleClicked = () => {
    setDrawerActive(!drawerActive)
  }

  const handleLabelDelete = () => {
    deleted(index)
  }

  const getUserName = () => {
    if (!user) { return null }
    return user.displayName
  }

  const getUserImage = () => {
    if (!user) { return null }
    if (!user.fromLine) {
      return userImageUrls[user.imageId]
    } {
      return user.imageURL
    }
  }

  return (
    <>
      <div className={[styles.container, _valid ? "" : styles.invalid].join(" ")}>
        <label
          style={inlineStyles.label}
          className={styles.label}
          onClick={handleClicked}>
          <div className={styles.name}>
            <Image style={{ paddingRight: '12px' }} size='56px' imageUrl={getUserImage()}/>
            {getUserName()}
          </div>
          <div className={styles.icon}>
            <Svg icon='downArrow' size='24'/>
          </div>
        </label>

        <TextInput
          name="金額"
          svg={<Svg icon='Money' size='24' className='gold900'/> }
          style={inlineStyles.amountLabel}
          value={amount ? amount : ''}
          invalidFeedback={'不可為空'}
          valid={true}
          placeholder='輸入金額'
          changed={amountCallback}
          type='number'
          deleted={handleLabelDelete}
          deleteActive={deleteActive}
        />
      </div>
      {
        (_valid === false) ?
          <div style={invalidFeedbackStyle} className={styles.invalidFeedback}>{invalidFeedback}</div> :
          null
      }

      <Drawer
        open={drawerActive}
        closed={() => setDrawerActive(false)}>
        <RadioFilterSelect
          searchInput={true}
          selectedObject={user}
          createLabel={createUserRadioLabel}
          objects={users}
          changed={userSelectCallback}
          closed={() => setDrawerActive(false)}
        />
      </Drawer>
    </>
  )
};

export default UserRadioSelectAmountLabel

const inlineStyles = {
  label: {
    background: '#F6F6F6',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px'
  },
  amountLabel: {
    marginBottom: '0px',
    background: '#F6F6F6',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
    borderBottomRightRadius: '16px',
    borderBottomLeftRadius: '16px'
  }
}
