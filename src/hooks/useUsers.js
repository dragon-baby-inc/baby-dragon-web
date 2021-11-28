import { useState, useEffect } from 'react';
import { dragonBabyApi } from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useUsers =  (callback) => {
  const { group_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true)
    await dragonBabyApi.getUsers(group_id)
      .then(function (response) {
        setUsers(response.data.users.map((u) => {
          return {
            id: u.line_id,
            displayName: u.display_name,
            imageURL: u.image_url,
            fromLine: u.from_line,
            coverCost: u.cover_cost,
            restrictedDestroy: u.restricted_destroy
          }
        }))
      })
      .catch(function (error) {
        console.log(error)
      })
    setLoading(false)
  }

  useEffect(() => {
    getUsers();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return [users, loading];
}

export default useUsers;
