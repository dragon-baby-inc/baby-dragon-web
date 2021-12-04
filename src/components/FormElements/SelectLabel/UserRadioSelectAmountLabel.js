import React, { useState, useEffect } from 'react';
import styles from './SelectLabel.module.scss'
import {
  FontAwesomeIcon,
  Drawer,
  Image,
  DrawerRadioSelect,
  TextInput
} from '../../../components'
import {
  useUserRadioSelect
} from '../../../hooks'
import {
  createUserRadioLabel
} from '../../../generators/labelGenerator'

const UserRadioSelectAmountLabel = ({
  users,
  amount,
  user,
  callback,
  style,
  index,
  forceDrawerActive,
  deleted,
  deleteActive
}) => {
  const [drawerActive, setDrawerActive] = useState(forceDrawerActive)

  const userSelectCallback = (object) => {
    setDrawerActive(false)
    if (callback) { callback(index, { user: object, amount: amount }) }
  }

  const amountCallback = (value) => {
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
    return user.imageURL
  }

  return (
    <>
      <label
        style={inlineStyles.label}
        className={styles.label}
        onClick={handleClicked}>
        <div className={styles.name}>
          <Image style={{ paddingRight: '12px' }} size='56px' imageUrl={getUserImage()}/>
          {getUserName()}
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon
            style={{ fontSize: '14px' }}
            faicon="faChevronDown"
          />
        </div>
      </label>

      <TextInput
        name="金額"
        faicon="farCreditCard"
        style={inlineStyles.amountLabel}
        value={amount}
        invalidFeedback={'不可為空'}
        valid={true}
        placeholder='輸入金額'
        changed={amountCallback}
        type='number'
        deleted={handleLabelDelete}
        deleteActive={deleteActive}
      />

      <Drawer
        open={drawerActive}
        closed={() => setDrawerActive(false)}>
        <DrawerRadioSelect
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
    background: '#F6F6F6',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px'
  }
}
