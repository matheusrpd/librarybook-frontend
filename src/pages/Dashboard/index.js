import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from "../../services/api";
import './styles.css';

import Logo from "../../assets/logo.png";
import IconAdd from "../../assets/IconAdd.svg";

export default function Dashboard({ history }) {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadBooks() {
          const response = await api.get("/books");
          setBooks(response.data);
          setFilteredBooks(response.data);
        }
        loadBooks();
    }, []);

    useEffect(() => {
        const results = books.filter((book) =>{
            return book.name.toLowerCase().includes(search.toLocaleLowerCase())
        });    
        setFilteredBooks(results);
    }, [search]);

    function handleClick(id) {
        history.push(`/book/${id}`);
    }

    return (
        <div className="container">
            <header>
                <img src={Logo} alt="Logo" className="logo" />
                <input 
                    type="text" 
                    id="search" 
                    placeholder="Pesquisar" 
                    value={search} 
                    onChange={event => setSearch(event.target.value)}/>
                <Link to="/newbook">
                    <button>
                        <img src={IconAdd} alt=""/>
                        Adicionar livro
                    </button>
                </Link>
            </header>

            <div className="books">

                {filteredBooks.map(book => (
                    <div key={book._id} className="book" onClick={() => handleClick(book._id)}>
                        <img src={book.url} alt="Capa do livro"/>
                        <h3>{book.name}</h3>
                        <strong>{book.author}</strong>
                    </div>
                ))}

            </div>
        </div>
    );
}
