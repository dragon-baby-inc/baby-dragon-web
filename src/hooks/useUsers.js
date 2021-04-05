import { useState, useEffect } from 'react';

const useUsers =  (callback) => {
  const [err, setErr] = useState(null);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      let users = [
        { id: 1, displayName: 'Yen Jung Chen' },
        { id: 2, displayName: 'Ting En Wei' },
        { id: 3, displayName: 'Some very long nammmm' },
        { id: 4, displayName: 'test4' },
        { id: 5, displayName: 'test5' },
        { id: 6, displayName: 'test6' },
      ]
      setUsers(users)
    } catch (e) {
      setErr(e);
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  return [users, err];
}

export default useUsers;
