import { useState, useEffect } from 'react';
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useLogMessages =  (query) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logMessages, setlogMessages] = useState([]);

  const getLogMessages = async () => {
    setLoading(true)
    await axios.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/log_messages`)
      .then(function (response) {
        setlogMessages(response.data.log_messages)
      })
      .catch(function (error) {
        setErr(error);
      })
    setLoading(false)
  }

  useEffect(() => {
    getLogMessages();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return [logMessages, loading, err];
}

export default useLogMessages;
