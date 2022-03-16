import { useState, useEffect } from "react";
import axios from "../api/dragonBabyApi";
import { useParams } from "react-router-dom";

const useLogMessages = (authState) => {
  const { group_id, accounting_book_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logMessages, setlogMessages] = useState([]);

  const getLogMessages = async () => {
    setLoading(true);

    if (authState && authState.api) {
      await authState.api
        .getLogMessages(group_id, accounting_book_id)
        .then(function (response) {
          setlogMessages(response.data.log_messages);
          setLoading(false);
        })
        .catch(function (error) {
          setErr(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getLogMessages();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [authState.api]);

  return [logMessages, loading, err];
};

export default useLogMessages;
