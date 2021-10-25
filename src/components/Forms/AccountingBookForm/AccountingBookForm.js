import React, { useState } from "react"
import { useParams } from 'react-router-dom';
import styles from './AccountingBookForm.module.scss'
import TextInput from '../../FormElements/TextInput/TextInput'
import Button from '../../FormElements/Button/Button'
import useHistory from '../../../hooks/useHistory'
import axios from '../../../api/dragonBabyApi'

const AccountingBookForm = ({
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

    axios.post(`api/v1/groups/${group_id}/accounting_books`, { accounting_book: { name: name } })
      .then((res) => {
        history.navigate(`/liff_entry/groups/${group_id}/accounting_books/${res.data.accounting_book.id}/payments`)
      })
  }

  return(
    <form className={styles.form}>
      <div className={styles.text}>
        請幫新帳本取名
      </div>

      <TextInput
        disabled={false}
        placeholder={'輸入名稱'}
        changed={handleInputChange}
        name={'名稱'}
        labelClass={styles.input}
        valid={valid}
        labelStyle={valid == false ? { width: '100%', padding: '10px 0px 0px' } : { width: '100%', padding: '10px 0px 10px' } }
        invalidFeedback="*不可為空白，12字內"
        type='text'
        value={name}
      />

      <Button btnClass={styles.btn} clicked={handleSubmit}>送出</Button>
    </form>
  )
}

export default AccountingBookForm
