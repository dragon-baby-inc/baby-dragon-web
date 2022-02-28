import { useState, useEffect } from 'react';
import store from '../utilities/localStore'
import { normalizeGroupUser } from '../normalizers'
import { dragonBabyApi } from '../api/dragonBabyApi'
import { imageUrls } from '../constants'
import { useParams } from 'react-router-dom';

const useCurrentAccountingBook =  (authState) => {
  const { group_id } = useParams();
  const [err, setErr] = useState(null);
  const [accountingBookId, setAccountingBookId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authState && authState.api) {
      let accounting_book_id;

      authState.api.getCurrentAccountingBook(group_id, accounting_book_id)
        .then((response) => {
          console.log(response.data)

          setAccountingBookId(response.data.id)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)

        })
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [authState])

  return [accountingBookId, loading, err];
}

export default useCurrentAccountingBook;
