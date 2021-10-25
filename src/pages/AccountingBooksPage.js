import React, { useState, useContext, useEffect } from "react";
import useAccountingBooks from '../hooks/useAccountingBooks';
import PaymentsHeader from '../components/PaymentsHeader/PaymentsHeader';
import AccountingBookLabel from '../components/FormElements/AccountingBookLabel/accountingBookLabel';
import AccountingBooksHeader from '../components/AccountingBooksHeader/AccountingBooksHeader'
import useScrollInfo from 'react-element-scroll-hook';
import Loading from '../components/Loading/Loading'
import PageHeader from '../components/PageHeader/PageHeader'
import { faUsers } from '@fortawesome/fontawesome-free-solid'
import { themeColors } from '../constants/globalColors'
import CircleFloatingIcon from '../components/IconLinks/CircleFloatingIcon/CircleFloatingIcon'
import TopRightIcon from '../components/IconLinks/TopRightIcon'

const styles = {
  bg: {
    width: '100%',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden',
    background: `linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)`,
  },
  books: {
    overflow: 'auto',
    height: '100%',
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
  const [scrollInfo, setRef] = useScrollInfo();

  const objects = books.map(book => {
    return <AccountingBookLabel key={book.uuid} object={book}/>
  })

  return(
    <div style={styles.bg}>
      <TopRightIcon link={`/liff_entry/groups/${group.id}/accounting_books/new`} color={themeColors.gold700} faIcon='faPlus'/>
      <PageHeader title={'帳本列表'} faIcon={faUsers} color={themeColors.gray400}/>
      {
        loading ?
          <div style={styles.loading}>
            <Loading />
          </div>
          :
          <div style={styles.books} ref={setRef}>
            {objects}
          </div>
      }
    </div>
  )
}

export default AccountingBookSummaryPage
