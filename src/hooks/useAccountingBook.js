import { useState, useEffect } from 'react';
import { normalizeGroupUser } from '../normalizers'
import { dragonBabyApi } from '../api/dragonBabyApi'
import { imageUrls } from '../constants'
import { useParams } from 'react-router-dom';

const useAccountingBook =  (callback) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [accountingBook, setAccountingBook] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const stubUsers = [
    {id: 'U4fb1cd3edb7c2552e2a25f286f5c102d', displayName: 'Yen-jung Chen', imageURL: null, fromLine: true, coverCost: true},
    {id: 'CUSTOM-c75ab772b07bd3b70e4f345a', displayName: '小恩1號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-99737d65a9022477c2533267', displayName: '小恩2號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-8a5eabcef8067e18d3d4f1c3', displayName: '小恩3號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-13b066ed3aef8beb35846063', displayName: '小恩4號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-29e82848f7a2c6c097b5adbc', displayName: '小龍', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-eed1e996dfbf24cdfdd6f748', displayName: '小龍0號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-cdf6ed2928e4f17c4e7854e5', displayName: '小龍1號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-1d6c9fd5f5bff722720e5a9b', displayName: '小龍2號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-12392d55aab175ba9cce09ca', displayName: '小龍3號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-1e45c97974d994e80b903757', displayName: '小龍4號', imageURL: null, fromLine: false, coverCost: true},
    {id: 'CUSTOM-3243610a4970d2a99f67f517', displayName: '小小龍', imageURL: null, fromLine: false, coverCost: false},
    {id: 'CUSTOM-1866224c8f2f5ece35c582ed', displayName: '小恩0號', imageURL: null, fromLine: false, coverCost: false}
  ]

  const stubAccountingBook = {
    cover_cost_users_size: 11,
    created_at: "2021-12-04",
    currency: "TWD",
    currency_symbol: "$",
    current: true,
    group_id: "1a6f20ec-2a22-480b-9877-f314a1dddac6",
    group_name: "測試龍寶寶 私人",
    id: "54526df8-e8e7-423b-92a7-d7e1bafa70fe",
    imageUrl: "https://storage.googleapis.com/baby-dragon/public/AccountingBookIcon/AccoutingBookIcon-0.jpg",
    image_id: 0,
    name: "第一本帳本",
    payments: "2021-12-04",
    send_liff_confirm_message: true,
    use_payment_auto_detection: true,
    users_size: 13,
  }

  let stub = false
  useEffect(() => {
    if (stub) {
      setUsers(stubUsers)
      setAccountingBook(stubAccountingBook)
      setLoading(false)
      return
    }

    setTimeout(() => {
      dragonBabyApi.getAccountingBook(group_id, accounting_book_id)
        .then(function (response) {
          let users = response.data.users.map(u => {
            return normalizeGroupUser(u)
          })
          setUsers(users)
          setAccountingBook(
            {
              imageUrl: imageUrls[response.data.accounting_book.image_id],
              ...response.data.accounting_book
            }
          )

        })
        .catch(function (error) {
          setErr(error);

        })
      setLoading(false)
    }, 0)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return [users, accountingBook, loading, err, setUsers];
}

export default useAccountingBook;
