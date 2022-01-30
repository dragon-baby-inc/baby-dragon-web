import { useState, useEffect } from 'react';
import store from '../utilities/localStore'
import { imageUrls } from '../constants'
import axios from '../api/dragonBabyApi'
import { useParams } from 'react-router-dom';

const useAccountingBooks =  (authState) => {
  const { group_id } = useParams();
  const [err, setErr] = useState(null);
  const groupAccountingBooksCache = store.get(`groupAccountingBooks-${group_id}`)
  const groupCurrentBookCache = store.get(`groupCurrentBook-${group_id}`)
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

        store.set(`groupAccountingBooks-${group_id}`, books)
        store.set(`groupCurrentBook-${group_id}`, currentBook)

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
