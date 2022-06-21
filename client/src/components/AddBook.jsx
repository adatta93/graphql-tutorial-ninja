import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getBooksQuery, getAuthorsQuery, addBookMutation, updateBookMutation } from '../queries/queries';

export default function AddBook({ editBook, setEditBook }) {
  const {loading,error,data} = useQuery(getAuthorsQuery);
  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: '',
    id: ''
  });
  const [addNewBook] = useMutation(addBookMutation);
  const [updateBook] = useMutation(updateBookMutation);

  useEffect(() => {
    setNewBook({
      name: editBook && editBook.name || '',
      genre: editBook && editBook.genre || '',
      authorId: editBook && editBook.author.id || '',
      id: editBook && editBook.id || '',
    });
  }, [editBook])

  if(loading) return 'Loading Authors...';
  if(error) return `Error: ${error.message}`;

  const formSubmit = (e) => {
    e.preventDefault();
    if(editBook == null) {
      console.log('Add ', newBook);
      addNewBook({
        variables: { name: newBook.name, genre: newBook.genre, authorId: newBook.authorId },
        refetchQueries: [{ query: getBooksQuery}]
      });
    } else {
      console.log('Update ', newBook);
      updateBook({
        variables: { bookId: newBook.id, name: newBook.name, genre: newBook.genre, authorId: newBook.authorId },
        refetchQueries: [{ query: getBooksQuery}]
      });
    }
    setEditBook(null);
  }

  return (
    <form id="add-book" onSubmit={formSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" value={newBook.name} onChange={e => setNewBook({...newBook, name: e.target.value})} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" value={newBook.genre} onChange={e => setNewBook({...newBook, genre: e.target.value})} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select value={newBook.authorId} onChange={e => setNewBook({...newBook, authorId: e.target.value})}>
          <option>Select author</option>
            {data.authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
        </select>
      </div>
      <button>{editBook == null ? 'Add Book' : 'Edit Book'}</button>
    </form>
  )
}
