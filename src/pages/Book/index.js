import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from "../../services/api";
import "./styles.css";

import Logo from "../../assets/logo.png";
import IconAdd from "../../assets/IconAdd.svg";

export default function Dashboard({ match, history }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
      async function loadBook() {
        const response = await api.get(`/books/${match.params.id}`);
        setBook(response.data);
      }
      loadBook();
  }, [match.params.id]);

  async function handleDelete() {
    console.log(book._id);
    await api.delete(`/books/${book._id}`);

    history.push("/");
    console.log("AInda aqui");
  }

  return (
    <div className="container">
      <header>
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
        <Link to="/newbook">
          <button>
            <img src={IconAdd} alt=""/>
            Adicionar livro
          </button>
        </Link>
      </header>

      <div className="bookDetails">  
        { book ?  
          <>
            <img src={book.url} alt=""/>
            <div className="details">
              <h3>{book.name}</h3>
              <strong className="author">{book.author}</strong>
              <p className="description">{book.description}</p>
              <div className="infos">
                <strong className="pages">Número de páginas: <p>{book.pages}</p></strong>
                <strong className="read">Lido: {book.status ? book.status === "yes" ? <p>SIM</p> : <p>NÃO</p> : <p>NÃO INFORMADO</p>} </strong>
              </div>
              <button onClick={handleDelete}>Deletar livro</button>
            </div>
          </>
         : <h3>NÃO EXISTE INFORMAÇÕES PARA MOSTRAR!</h3> 
        }
      </div>
    </div>
  );
}