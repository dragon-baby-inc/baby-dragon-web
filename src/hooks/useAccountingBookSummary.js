import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBookSummary =  (callback) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [summary, setSummary] = useState([]);

  const getAccountingBook = async () => {
    axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/summary`)
      .then(function (response) {
        console.log(response.data)
        setSummary(response.data)
      })
      .catch(function (error) {
        setErr(error);
      })
  }

  useEffect(() => {
    getAccountingBook();
  }, [])

  return [summary, err];
}

export default useAccountingBookSummary;
