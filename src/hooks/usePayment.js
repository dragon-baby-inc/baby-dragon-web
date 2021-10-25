import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const usePayment =  (query_params) => {
  const { group_id, accounting_book_id, payment_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(null);

  const getPayment = async () => {
    setLoading(true)
    await axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/payments/${payment_id}`)
      .then(function (response) {
        console.log(response.data)
        setPayment(response.data)
      })
      .catch(function (error) {
        setErr(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    getPayment();
  }, [])

  return [payment, loading, err];
}

export default usePayment;
