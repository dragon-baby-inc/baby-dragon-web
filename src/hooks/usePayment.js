import { useState, useEffect } from 'react';
import { dragonBabyApi } from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const usePayment =  (authState) => {
  const { group_id, accounting_book_id, payment_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);

  let stubPayment = {
    allocation_type: "amount",
    allocations: [{ower_id: 'CUSTOM-1d6c9fd5f5bff722720e5a9b', ower_display_name: '12345678', amount: 1001}] ,
    amount: 1001,
    created_at: "2021-12",
    description: "test",
    id: 120,
    ower_and_payer_message: "Ting En廷恩 付款 (由 1 人分)",
    paid_at: "2021-12-09T12:48:58.387Z",
    paid_back: false,
    payer_display_name: "Ting En廷恩",
    payer_id: "U4fb1cd3edb7c2552e2a25f286f5c102d",
  }

  let stub = false
  const getPayment = async () => {
    await authState.api.getPayment(group_id, accounting_book_id, payment_id)
      .then(function (response) {
        setPayment(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        setErr(error);
        setLoading(false)
      })
  }

  useEffect(() => {
    if (stub) {
      setPayment(stubPayment)
      return
    }

    if (authState && authState.api) {
      getPayment();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [authState.api])

  return [payment, loading, err];
}

export default usePayment;
