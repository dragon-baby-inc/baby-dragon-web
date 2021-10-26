import React, { useState, useContext, useEffect } from "react"
import useAccountingBook from '../hooks/useAccountingBook'
import useAccountingBookSummary from '../hooks/useAccountingBookSummary'
import { themeColors } from '../constants/globalColors'
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

const AccountingBookUsersPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const [summary] = useAccountingBookSummary()
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams();
  const [lockDeletion, setLockDeletion] = useState(true)
  const [selectObjectIds, setSelectObjectIds] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setSelectObjectIds([])
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
        <PageHeader title={editMode ? '編輯分帳名單' : '編輯使用者'} color={themeColors.gray400}/>
        <TopRightIcon clicked={() => {setShowForm(true)}} color={themeColors.gold900} faIcon='faPlus' style={{right: 2, fontSize: '20px'}}/>
        <TopLeftIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accounting_book_id}/settings`} color={themeColors.gold900} faIcon='faArrowLeft' style={{fontSize: '20px'}}/>
        {
          loading ?
            null :
            <AccountingBookUserMenu
              editMode={false}
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

  // {
  //   editMode ?
  //     <TopRightIcon clicked={() => {setEditMode(false)}} style={{ right: 38 }} color={themeColors.gold700} faIcon='faTimes'/>
  //     :
  //     <TopRightIcon clicked={() => {setEditMode(true)}} style={{ right: 38 }} color={themeColors.gold700} faIcon='faEdit'/>
  // }
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
