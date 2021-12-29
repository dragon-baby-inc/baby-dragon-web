import { useState, useEffect } from 'react';
import { normalizeGroupUser } from '../normalizers'
import { dragonBabyApi } from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useUsers =  (authState) => {
  const { group_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true)
    await authState.api.getUsers(group_id)
      .then(function (response) {
        setUsers(response.data.users.map((u) => {
          return normalizeGroupUser(u)
        }))
      })
      .catch(function (error) {
        console.log(error)
      })
    setLoading(false)
  }

  useEffect(() => {
    if (authState && authState.api) {
      getUsers();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [authState])

  return [users, loading, setUsers, getUsers];
}

export default useUsers;
