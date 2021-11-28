import { useState, useEffect } from 'react';
import { dragonBabyApi } from '../api/dragonBabyApi'
import { imageUrls } from '../constants'
import { useParams } from 'react-router-dom';

const useAccountingBook =  (callback) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [accountingBook, setAccountingBook] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
      dragonBabyApi.getAccountingBook(group_id, accounting_book_id)
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
          setAccountingBook(
            {
              imageUrl: imageUrls[response.data.accounting_book.image_id],
              ...response.data.accounting_book
            }
          )

        })
        .catch(function (error) {
          setErr(error);

        })
      setLoading(false)
    }, 0)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return [users, accountingBook, loading, err];
}

export default useAccountingBook;
