import { useHistory } from "react-router-dom";

const Hook =  () => {
  const history = useHistory();

  const navigate = (url) => {
    history.push(url)
  }

  const navigateTo = (page, args) => {
    navigate(routes[page](args))
  }

  const routes = {
    accountingBookPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books`,
    accountingBookSettingsPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/${args.accounting_book_id}/settings`,
    accountingBookEditPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/${args.accounting_book_id}/edit/index`,
    paymentIndexPage: (args) => `/liff_entry/groups/${args.group_id}/accounting_books/${args.accounting_book_id}/payments/index`,
  }

  return { navigate, navigateTo, routes };
}

export default Hook;
