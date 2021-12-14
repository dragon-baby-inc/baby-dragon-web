import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const usePayments =  (query) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  let stubPayments = [
    {
      allocations: [ {ower_display_name: '12345678', amount: 1001} ],
      amount: 1001,
      created_at: "Dec-09",
      description: "test",
      id: 120,
      ower_and_payer_message: "Ting En廷恩 付款 (由 1 人分)",
      paid_back: false,
      payer_display_name: "Ting En廷恩",
      payer_image_url: "null",
    },
  ]

  let stub = true

  const getPayments = async () => {
    setLoading(true)
    await axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/payments${query}`)
      .then(function (response) {
        setPayments(response.data.payments)
        console.log(response.data.payments[0])
      })
      .catch(function (error) {
        setErr(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    if (stub) {
      setPayments(stubPayments)
      return
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    getPayments();
  }, [])

  return [payments, loading, getPayments, err];
}

export default usePayments;
