import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBook =  (callback) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [accountingBook, setAccountingBook] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAccountingBook = async () => {
    setLoading(true)
    await axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}`)
      .then(function (response) {
        let users = response.data.users.map(u => {
          return {
            id: u.line_id,
            displayName: u.display_name,
            imageURL: u.image_url,
            fromLine: u.from_line,
            coverCost: u.cover_cost
          }
        })
        setUsers(users)
        setAccountingBook(response.data.accounting_book)
      })
      .catch(function (error) {
        setErr(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    getAccountingBook();
  }, [])

  return [users, accountingBook, loading, err];
}

export default useAccountingBook;
