import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import axios from '../api/dragonBabyApi'
import { themeColors } from '../constants'
import { useAccountingBook } from '../hooks'
import {
  Separater,
  PageHeader,
  Backdrop,
  UserForm,
  AccountingBookUserMenu,
} from '../components'

const AccountingBookUsersPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const { group_id, accounting_book_id } = useParams();
  const [selectObjectIds, setSelectObjectIds] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setSelectObjectIds(users.filter((u) => u.coverCost).map((u) => u.id))
  }, [users])

  const [timer, setTimer] = useState(null)
  const handleCoverCostUser = (objects) => {
    setSelectObjectIds(objects.map(obj => obj.id))

    clearTimeout(timer)

    let updateTimer = setTimeout(() => {
      axios.post(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/users`, { accounting_book_user_ids: objects.map(obj => obj.id) })
        .catch((res) => {
          window.location.reload();
        })
    }, 1200)
    setTimer(updateTimer)
  }

  return(
    <>
      <div style={styles.bg}>
        <PageHeader
          faicon='faChevronLeft'
          link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accounting_book_id}/settings`}
          color={themeColors.black}>
          分帳成員
        </PageHeader>
        <Separater style={{ margin: "0px" }}/>
        {
          loading ?
            null :
            <AccountingBookUserMenu
              editMode={editMode}
              setEditMode={setEditMode}
              labelType="user"
              objects={users}
              selected_object_ids={selectObjectIds}
              changed={handleCoverCostUser}
            />
        }
      {
        showForm ?
          <>
            <UserForm />
            <Backdrop icon="faTimes" clicked={() => setShowForm(false)}/>
          </>
          : null
      }
      </div>
    </>
  )
}

const styles = {
  textInput: {
    textAlign: "right",
    fontSize: "15px"
  },
  label: {
    minHeight: '55px',
    cursor: 'pointer',
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 30px",
    borderBottom: "1px solid #eee",
  },
  description: {
    fontSize: "15px"
  },
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    maxHeight: '-webkit-fill-available',
    position: 'relative',
  },
  h1: {
    padding: '12px',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  dateSeparator: {
    fontSize: '12px',
    textAlign: 'center',
    padding: '5px',
    color: themeColors.gray600,
  },
}

export default AccountingBookUsersPage
