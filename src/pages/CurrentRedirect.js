import React, { useContext } from "react"
import { Context as AuthContext } from '../contexts/AuthContext'
import { themeColors } from '../constants'
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FullPageLoader } from '../components'

import { useCurrentAccountingBook } from '../hooks'

const CurrentRedirect = ({
  page
}) => {
  const { state: authState } = useContext(AuthContext)
  const { group_id } = useParams();
  const [accountingBookId, loading] = useCurrentAccountingBook(authState)
  let redirectPath;

  if (accountingBookId) {
    switch (page) {
      case 'current_payments':
        redirectPath = `/liff_entry/groups/${group_id}/accounting_books/${accountingBookId}/payments/index`
        break;
      case 'current_summary':
        redirectPath = `/liff_entry/groups/${group_id}/accounting_books/${accountingBookId}/payments/summary`
        break;
      case 'current_new_payment':
        redirectPath = `/liff_entry/groups/${group_id}/accounting_books/${accountingBookId}/payments/new`
        break;
      default:
        redirectPath = '/'
    }
  }

  if (loading) {
    return <FullPageLoader />
  }

  return <Redirect to={redirectPath}></Redirect>
}

export default CurrentRedirect
