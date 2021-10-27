import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBooks =  (callback) => {
  const { group_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [group, setGroup] = useState([]);

  const getAccountingBook = async () => {
    setLoading(true)
    await axios.get(`api/v1/groups/${group_id}/accounting_books`)
      .then(function (response) {
        setBooks(response.data.accounting_books)
        setGroup(response.data.group)
      })
      .catch(function (error) {
        setErr(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    getAccountingBook();
  }, [])

  return [books, group, loading, err];
}

export default useAccountingBooks;
