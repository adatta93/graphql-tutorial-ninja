//jshint esversion: 6
import { gql } from '@apollo/client';

const getBooksQuery = gql `
  {
    books {
      name
      id
      genre
      author {
        id
      }
    }
  }
`;

const getAuthorsQuery = gql `
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql `
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql `
  query($bookId: ID!) {
    book(id: $bookId) {
      name
      genre
      id
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const deleteBookMutation = gql `
  mutation DeleteBook($bookId: ID!) {
    deleteBook(id: $bookId) {
      id
    }
  }
`;

const updateBookMutation = gql `
  mutation UpdateBook($bookId: ID!, $name: String!, $genre: String!, $authorId: ID!) {
    updateBook(id: $bookId, name: $name, genre: $genre, authorId: $authorId) {
      id
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery, deleteBookMutation, updateBookMutation };