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

const AccountingBookUsersPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const [summary] = useAccountingBookSummary()
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams();
  const [lockDeletion, setLockDeletion] = useState(true)
  const [selectObjectIds, setSelectObjectIds] = useState([])

  useEffect(() => {
    setSelectObjectIds(users.map((u) => u.id))
  }, [users])


  const [timer, setTimer] = useState(null)
  const handlInputChange = (value, params, setState) => {
  }

  return(
    <>
      <div style={styles.bg}>
      <PageHeader title={'分帳名單'} color={themeColors.gray400}/>
        <TopLeftIcon link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accounting_book_id}/settings`} color='black' faIcon='faArrowLeft'/>
        {
          loading ?
            null :
            <AccountingBookUserMenu
              labelType="user"
              objects={users}
              selected_object_ids={selectObjectIds}
              changed={(objects) => setSelectObjectIds(objects.map(obj => obj.id))}
            />
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
