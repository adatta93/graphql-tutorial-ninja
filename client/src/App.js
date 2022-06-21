import React, {useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

//Setting up Apollo
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  const [editBook, setEditBook] = useState(null);

  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList setEditBook={setEditBook} />
        <AddBook editBook={editBook} setEditBook={setEditBook} />
      </div>
    </ApolloProvider>
  );
}

export default App;
