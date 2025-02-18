import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import About from './pages/About';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<BookList />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
