import { useState, useEffect } from "react";
import store from "../utilities/localStore";
import axios from "../api/dragonBabyApi";
import { useParams } from "react-router-dom";

const usePayments = (authState, query) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const accountingBookPaymentsCache = store.get(
    `accountingBookPayments-${accounting_book_id}`
  );
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState(
    accountingBookPaymentsCache ? accountingBookPaymentsCache : []
  );

  let stubPayments = [
    {
      allocations: [{ ower_display_name: "12345678", amount: 1001 }],
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
      allocations: [{ ower_display_name: "12345678", amount: 1001 }],
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
      allocations: [{ ower_display_name: "12345678", amount: 1001 }],
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
      allocations: [{ ower_display_name: "12345678", amount: 1001 }],
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
      allocations: [{ ower_display_name: "12345678", amount: 1001 }],
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
      allocations: [{ ower_display_name: "12345678", amount: 1001 }],
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
      allocations: [{ ower_display_name: "12345678", amount: 1001 }],
      amount: 1001,
      created_at: "Dec-09",
      description: "test",
      id: 120,
      ower_and_payer_message: "Ting En廷恩 付款 (由 1 人分)",
      paid_back: false,
      payer_display_name: "Ting En廷恩",
      payer_image_url: "null",
    },
  ];

  let stub = false;

  const getPayments = async () => {
    await authState.api
      .getPayments(group_id, accounting_book_id, query)
      .then(function (response) {
        const payments = response.data.payments;
        setPayments(payments);
        store.set(
          `accountingBookPayments-${accounting_book_id}`,
          payments.slice(0, 10)
        );
        store.set(
          `accountingBookPaymentsSize-${accounting_book_id}`,
          payments.length
        );
        setLoading(false);
      })
      .catch(function (error) {
        setErr(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (stub) {
      setPayments(stubPayments);
      return;
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    if (authState && authState.api) {
      if (accountingBookPaymentsCache) {
        setLoading(false);
      }

      getPayments();
    }
  }, [authState]);

  return [payments, loading, getPayments, err];
};

export default usePayments;
