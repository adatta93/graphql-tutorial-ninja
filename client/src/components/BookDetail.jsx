import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

export default function BookDetail({ bookId }) {
  const {data,loading,error} = useQuery(getBookQuery, { variables: { bookId }, skip: !bookId });

  if(loading) return (<div id="book-details">Book Detail Loading...</div>);
  if(error || !data) return (<div id="book-details">No Book selected</div>);

  return (
    <div id="book-details">
      <h2>{ data.book.name }</h2>
      <p>{ data.book.genre }</p>
      <p>{ data.book.author.name }</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        { data.book.author.books.map(item => {
          return <li key={item.id}>{ item.name }</li>
        })}
      </ul>
    </div>
  )
}
