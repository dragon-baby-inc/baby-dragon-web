import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBookSummary =  (callback) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState([]);

  const getAccountingBook = async () => {
    setLoading(true)
    await axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/summary`)
      .then(function (response) {
        setSummary(response.data.transactions)
      })
      .catch(function (error) {
        setErr(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    getAccountingBook();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return [summary, loading, err];
}

export default useAccountingBookSummary;
