import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getBooksQuery, deleteBookMutation } from '../queries/queries';
import BookDetail from './BookDetail';

export default function BookList({ setEditBook }) {
  const {loading,error,data} = useQuery(getBooksQuery);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteBook] = useMutation(deleteBookMutation);

  const onDeleteBook = (e, bookId) => {
    e.stopPropagation();
    deleteBook({
      variables: {bookId},
      refetchQueries: [{ query: getBooksQuery}]
    })
  }

  const onEditBook = (e, book) => {
    e.stopPropagation();
    setEditBook(book);
  }

  if(loading) return 'Loading Books...';
  if(error) return `Error: ${error.message}`;
  return (
    <div>
      <ul id="book-list">
          {data.books.map(book => (
            <li key={book.id} onClick={e => setSelectedBook(book.id)}>
              {book.name}
              <button onClick={e => onEditBook(e, book)}>Edit</button>
              <button onClick={e => onDeleteBook(e, book.id)}>Delete</button>
            </li>
          ))}
      </ul>
      <BookDetail bookId={selectedBook} />
    </div>
  )
}
