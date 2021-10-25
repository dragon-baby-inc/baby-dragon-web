import React, { useState } from "react"
import { useParams } from 'react-router-dom';
import styles from './UserForm.module.scss'
import TextInput from '../../FormElements/TextInput/TextInput'
import Button from '../../FormElements/Button/Button'
import useHistory from '../../../hooks/useHistory'
import axios from '../../../api/dragonBabyApi'

const UserForm = ({
  group,
  changed
}) => {
  const history = useHistory();
  const [name, setName] = useState("")
  const [valid, setVaid] = useState(null)
  const { group_id } = useParams();

  const handleInputChange = (value) => {
    if (value.length < 1) {
      setVaid(false)
    }
    setName(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name.length < 1) {
      setVaid(false)
      return
    }

    axios.post(`api/v1/groups/${group_id}/users`, { name: name })
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
        labelStyle={valid == false ? { width: '100%', padding: '10px 0px 0px' } : { width: '100%', padding: '10px 0px 10px' }}
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
