import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBook =  (callback) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [accountingBook, setAccountingBook] = useState([]);
  const [users, setUsers] = useState([]);

  const getAccountingBook = async () => {
    axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}`)
      .then(function (response) {
        let users = response.data.users.map(u => {
          return {
            displayName: u.display_name,
            id: u.line_id,
            imageURL: u.image_url
          }
        })
        setUsers(users)
        setAccountingBook(response.data.accounting_book)
      })
      .catch(function (error) {
        setErr(error);
      })
  }

  useEffect(() => {
    getAccountingBook();
  }, [])

  return [users, accountingBook, err];
}

export default useAccountingBook;
