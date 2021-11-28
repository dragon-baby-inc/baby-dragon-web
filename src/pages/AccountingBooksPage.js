import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useHistory, useAccountingBooks } from '../hooks';
import { themeColors } from '../constants/globalColors'
import axios from '../api/dragonBabyApi'
import {
  Loading,
  AccountingBookLabel,
  AccountingBooksHeader,
  AccountingBookForm,
  Backdrop,
  AccountingBookAddLabel
} from '../components';

const styles = {
  bg: {
    width: '100%',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden',
    background: `linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)`,
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
    background: 'white',
  }
}

const AccountingBookSummaryPage = ({
  users,
}) => {
  const [books, group, loading, currentBook, setCurrentBook] = useAccountingBooks()
  const history = useHistory();
  const { group_id } = useParams()
  const [showForm, setShowForm] = useState(false)
  console.log()

  const objects = books.map(book => {
    return <AccountingBookLabel
      current={currentBook ? currentBook.uuid === book.uuid : false}
      handleSetCurrent={(id) => handleSetAsCurrent(id)}
      key={book.uuid}
      object={book}/>
  })

  const handleSetAsCurrent = (uuid) => {
    if (uuid) {
      axios.post(`api/v1/groups/${group.id}/accounting_books/${uuid}/set_as_current`)
        .then((res) => {
          setCurrentBook({ uuid: res.data.accounting_book.uuid })
        })
        .catch((res) => {
          console.log(res.response)
        })
    }
  }

  return(
    <div style={styles.bg}>
      <AccountingBooksHeader group={group} title={'帳本列表'} color={themeColors.gray400}/>
      {
        showForm ?
          <>
            <AccountingBookForm />
            <Backdrop icon="faTimes" clicked={() => setShowForm(false)}/>
          </>
          : null
      }

      {
        loading ?
          <div style={styles.loading}> <Loading /> </div>
          :
          <div style={styles.books}>
            {objects}
            <AccountingBookAddLabel clicked={() => { history.navigateTo("accountingBookCreationPage", { group_id }) }}></AccountingBookAddLabel>
          </div>
      }
    </div>
  )
}

export default AccountingBookSummaryPage
