import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBookSummary =  (authState) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState([]);

  const getAccountingBook = async () => {
    setLoading(true)
    await authState.api.getAccountingBookSummary(group_id, accounting_book_id)
      .then(function (response) {
        setSummary(response.data.transactions)
      })
      .catch(function (error) {
        setErr(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    if (authState && authState.api) {
      getAccountingBook();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [authState])

  return [summary, loading, err, getAccountingBook];
}

export default useAccountingBookSummary;
