import { useHistory } from "react-router-dom";

const Hook =  () => {
  const history = useHistory();

  const navigate = (url) => {
    history.push(url)
  }

  const navigateTo = (page, args) => {
    if (args.group_id !== undefined) {
      navigate(routes[page](args))
    }
  }

  const routes = {
    accountingBookPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books`,
    accountingBookCreationPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/new`,
    accountingBookCurrencyPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/${args.accounting_book_id}/currency`,
    accountingBookSettingsPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/${args.accounting_book_id}/settings`,
    accountingBookEditPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/${args.accounting_book_id}/edit/index`,
    paymentIndexPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/${args.accounting_book_id}/payments/index`,
    paidBackPaymentPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/${args.accounting_book_id}/payments/paid_back?`,
  }

  return { navigate, navigateTo, routes };
}

export default Hook;
