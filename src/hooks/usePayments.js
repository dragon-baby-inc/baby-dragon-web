import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const usePayments =  (authState, query) => {
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

  let stub = false

  const getPayments = async () => {
    setLoading(true)

    await authState.api.getPayments(group_id, accounting_book_id, query)
      .then(function (response) {
        setPayments(response.data.payments)
        setLoading(false)
      })
      .catch(function (error) {
        setErr(error);
        setLoading(false)
      })
  }

  useEffect(() => {
    if (stub) {
      setPayments(stubPayments)
      return
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    if (authState && authState.api) {
      getPayments();
    }
  }, [authState])

  return [payments, loading, getPayments, err];
}

export default usePayments;
