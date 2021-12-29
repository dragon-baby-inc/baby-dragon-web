import { useState, useEffect } from 'react';
import { imageUrls } from '../constants'
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBooks =  (authState) => {
  const { group_id } = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [group, setGroup] = useState([]);
  const [currentBook, setCurrentBook] = useState({ uuid: null })

  const getAccountingBook = async () => {
    setLoading(true)

    await authState.api.getAccountingBooks(group_id)
      .then(function (response) {
        const books = response.data.accounting_books.map(b => {
          return { imageUrl: imageUrls[b.image_id], ...b }
        })
        setBooks(books)
        setCurrentBook(response.data.accounting_books.filter((b) => b.current)[0])
        setGroup(response.data.group)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
        setErr(error);
        setLoading(false)
      })
  }

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    if (authState && authState.api) {
      getAccountingBook();
    }
  }, [authState])

  return [books, group, loading, currentBook, setCurrentBook, err];
}

export default useAccountingBooks;
