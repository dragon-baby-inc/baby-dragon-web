import React, { useState, useContext } from "react";
import { Context as AuthContext } from '../../../contexts/AuthContext'
import styles from './UserForm.module.scss'
import { useParams } from 'react-router-dom';
import { Button, TextInput } from '../../FormElements'

const UserForm = ({
  group,
  changed
}) => {
  const { state: authState } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [valid, setVaid] = useState(null)
  const { group_id } = useParams();

  const handleInputChange = (value) => {
    if (value.length < 1) { setVaid(false) }
    setName(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name.length < 1) {
      setVaid(false)
      return
    }

    authState.api.createUser(group_id, { name: name })
      .then((res) => {
        window.location.reload();
      })
  }

  return(
    <form className={styles.form}>
      <div className={styles.text}>
        群組內的成員會被自動偵測
      </div>
      <div className={styles.text}>
        只有不加入群組的成員才需要手動建立喔
      </div>

      <TextInput
        disabled={false}
        placeholder={'虛擬使用者'}
        changed={handleInputChange}
        name={'名字'}
        labelStyle={valid === false ? { width: '100%', padding: '10px 0px 0px' } : { width: '100%', padding: '10px 0px 10px' }}
        valid={valid}
        invalidFeedback="*不可為空白，12字內"
        type='text'
        value={name}
      />

      <Button btnClass={styles.btn} clicked={handleSubmit}>送出</Button>
    </form>
  )
}

export default UserForm
