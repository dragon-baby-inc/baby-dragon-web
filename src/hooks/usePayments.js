import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams, useLocation } from 'react-router-dom';

const usePayments =  (query) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  const getPayments = async () => {
    setLoading(true)
    await axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/payments${query}`)
      .then(function (response) {
        setPayments(response.data.payments)
      })
      .catch(function (error) {
        setErr(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    getPayments();
  }, [])

  return [payments, loading, getPayments, err];
}

export default usePayments;
