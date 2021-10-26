import React, { useState, useContext, useEffect } from "react"
import useAccountingBook from '../hooks/useAccountingBook'
import useUsers from '../hooks/useUsers'
import { themeColors } from '../constants/globalColors'
import menuStyles from '../components/FormElements/SelectMenu/AccountingBookUserMenu.module.scss'
import TopLeftIcon from '../components/IconLinks/TopLeftIcon'
import PageHeader from '../components/PageHeader/PageHeader'
import Loading from '../components/Loading/Loading'
import EmptyResult from '../components/EmptyResult/EmptyResult'
import Backdrop from '../components/Backdrop/Backdrop'
import MyFontAwesomeIcon from '../utilities/FontAwesomeIcon'
import useHistory from '../hooks/useHistory'
import { useParams } from 'react-router-dom';
import useInput from '../hooks/useInput'
import { Context as AccountingBookContext} from '../contexts/AccountingBookContext.js'
import axios from '../api/dragonBabyApi'
import Button from '../components/FormElements/Button/Button'
import AccountingBookUserMenu from '../components/FormElements/SelectMenu/AccountingBookUserMenu'
import TopRightIcon from '../components/IconLinks/TopRightIcon'
import UserForm from '../components/Forms/UserForm/UserForm'
import UserLabel from '../components/FormElements/UserLabel/UserLabel'

const GroupUsersPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const [users, setUsers, loading] = useUsers()
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams();
  const [lockDeletion, setLockDeletion] = useState(true)
  const [selectObjectIds, setSelectObjectIds] = useState([])
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
