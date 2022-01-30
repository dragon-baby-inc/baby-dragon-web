import React, { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom';
import { useHistory, useAccountingBooks } from '../hooks';
import { themeColors } from '../constants/globalColors'
import axios from '../api/dragonBabyApi'
import {
  FullPageLoader,
  Loading,
  AccountingBookLabel,
  AccountingBooksHeader,
  Backdrop,
  AccountingBookAddLabel
} from '../components';

const styles = {
  bg: {
    width: '100%',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden',
  },
  books: {
    paddingBottom: '100px',
    height: 'calc(100vh - 40px)',
    overflow: 'auto',
    background: 'white',
  },
  loading: {
    display: 'flex',
    height: 'calc(100vh - 60px)',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const AccountingBookSummaryPage = ({
  users,
}) => {
  const { state: authState } = useContext(AuthContext)
  const { group_id } = useParams();
  const [disableForm, setDisableForm] = useState(true)
  const [books, group, loading, currentBook, setCurrentBook] = useAccountingBooks(authState)
  const history = useHistory();

  useEffect(() => {
    if (!loading) {
      setDisableForm(false)
    }
  }, [loading])

  const objects = books.map(book => {
    return <AccountingBookLabel
      disabled={disableForm}
      current={currentBook ? currentBook.uuid === book.uuid : false}
      handleSetCurrent={(id) => handleSetAsCurrent(id)}
      key={book.uuid}
      object={book}/>
  })

  const handleSetAsCurrent = (uuid) => {
    setDisableForm(true)
    if (uuid) {
      authState.api.updateCurrentAccountingBook(group.id, uuid)
        .then((res) => {
          setCurrentBook({ uuid: res.data.accounting_book.uuid })
          setDisableForm(false)
        })
        .catch((res) => {
          console.log(res.response)
          setDisableForm(false)
        })
    }
  }

  return(
    <>
      <div style={styles.bg}>
        <AccountingBooksHeader group={group} title={'帳本列表'} color={themeColors.gray400}/>
        {
          loading ?
            null
            :
            <div style={styles.books}>
              {objects}
              <AccountingBookAddLabel clicked={() => { history.navigateTo("accountingBookCreationPage", { group_id }) }}></AccountingBookAddLabel>
            </div>
        }
      </div>
      {
        disableForm ?
          <FullPageLoader /> : null

      }
    </>
  )
}

export default AccountingBookSummaryPage
