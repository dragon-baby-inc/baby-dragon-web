import React, { useState } from "react";
import { useAccountingBooks } from '../hooks';
import { themeColors } from '../constants/globalColors'
import {
  Loading,
  AccountingBookLabel,
  AccountingBooksHeader,
  AccountingBookForm,
  Backdrop
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
    paddingTop: '10px',
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
  const [books, group, loading] = useAccountingBooks()
  const [showForm, setShowForm] = useState(false)

  const objects = books.map(book => {
    return <AccountingBookLabel key={book.uuid} object={book}/>
  })

  return(
    <div style={styles.bg}>
      <AccountingBooksHeader setShowForm={setShowForm} group={group} title={'帳本列表'} color={themeColors.gray400}/>
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
          <div style={styles.books}> {objects} </div>
      }
    </div>
  )
}

export default AccountingBookSummaryPage
