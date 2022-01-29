import { useState, useEffect } from 'react';
import { imageUrls } from '../constants'
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBooks =  (authState) => {
  const { group_id } = useParams();
  const [err, setErr] = useState(null);
  const groupAccountingBooksCache = JSON.parse(localStorage.getItem(`groupAccountingBooks-${group_id}`))
  const groupCurrentBookCache = JSON.parse(localStorage.getItem(`groupCurrentBook-${group_id}`))
  const [books, setBooks] = useState(groupAccountingBooksCache ? groupAccountingBooksCache : []);
  const [loading, setLoading] = useState(groupAccountingBooksCache ? false : true);
  const [group, setGroup] = useState([]);
  const [currentBook, setCurrentBook] = useState(groupCurrentBookCache ? groupCurrentBookCache : { uuid: null })


  const getAccountingBook = async () => {
    await authState.api.getAccountingBooks(group_id)
      .then(function (response) {
        const books = response.data.accounting_books.map(b => {
          return { imageUrl: imageUrls[b.image_id ? b.image_id : 0], ...b }
        })

        setBooks(books)
        let currentBook = response.data.accounting_books.filter((b) => b.current)[0]
        setCurrentBook(currentBook)
        setGroup(response.data.group)

        try {
          localStorage.setItem(`groupAccountingBooks-${group_id}`, JSON.stringify(books));
          localStorage.setItem(`groupCurrentBook-${group_id}`, JSON.stringify(currentBook));
        } catch {}

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
