import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const usePayments =  (callback) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [payments, setPayments] = useState([]);

  const getPayments = async () => {
    axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/payments`)
      .then(function (response) {
        setPayments(response.data.payments)
      })
      .catch(function (error) {
        setErr(error);
      })
  }

  useEffect(() => {
    getPayments();
  }, [])

  return [payments, err];
}

export default usePayments;
