import React, { useState, useEffect } from "react"
import menuStyles from '../components/FormElements/SelectMenu/AccountingBookUserMenu.module.scss'
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';
import { themeColors } from '../constants'
import { useUsers } from '../hooks'
import {
  TopLeftIcon,
  TopRightIcon,
  PageHeader,
  UserForm,
  UserLabel,
  Backdrop
} from '../components'

const GroupUsersPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const [users, setUsers, loading] = useUsers()
  const { group_id, accounting_book_id } = useParams();
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
  }, [users])

  const handleDeleteUser = (id) => {
    if (id) {
      axios.delete(`api/v1/groups/${group_id}/users/${id}`)
        .then(res => {
          window.location.reload()
        })
        .catch((res) => {
        })
    }
  }

  let objectLabels= []
  if (users) {
    objectLabels = users.map(object => {
      return <UserLabel
        handleDeleteUser={handleDeleteUser}
        hideInput={true}
        key={object.id}
        object={object}
      />
    })
  }

  return(
    <>
      <div style={styles.bg}>
        <PageHeader title={editMode ? '編輯分帳名單' : '編輯使用者'} color={themeColors.gray400}/>
        <TopRightIcon clicked={() => {setShowForm(true)}} color={themeColors.gold900} faIcon='faPlus' style={{right: 2, fontSize: '20px'}}/>
        <TopLeftIcon link={`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/settings`} color={themeColors.gold900} faIcon='faArrowLeft' style={{fontSize: '20px'}}/>
        {
          loading ?
            null :
            <div className={menuStyles.labels}>
              {objectLabels}
            </div>
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

export default GroupUsersPage
