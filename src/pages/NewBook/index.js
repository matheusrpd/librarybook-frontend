import React, { useState, useMemo } from 'react';
import { Link } from "react-router-dom";

import api from "../../services/api";
import './styles.css';

import { MdImage } from "react-icons/md";
import Logo from "../../assets/logo.png";
import Image from "../../assets/image.svg";

export default function Dashboard({ history }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [status, setStatus] = useState("yes");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();

    data.append("name", name);
    data.append("author", author);
    data.append("pages", pages);
    data.append("status", status);
    data.append("description", description);
    data.append("image", image);

    await api.post("/books", data);

    history.push("/");
  }

  return (
    <div className="container">
      <header>
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
      </header>

      <h3>Adicionar novo livro</h3>

      <div className="main">
        <form onSubmit={handleSubmit}>

          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Nome do livro"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            placeholder="Autor do livro"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />

          <label htmlFor="pages">Número de páginas</label>
          <input
            type="number"
            id="pages"
            placeholder="Quantidade de páginas"
            value={pages}
            onChange={event => setPages(event.target.value)}
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={event => setStatus(event.target.value)}
          >
            <option value="yes">Lido</option>
            <option value="no">Não lido</option>
          </select>

          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            placeholder="Digite a descrição do livro"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <label 
            id="inputFile" 
            style={{ backgroundImage: `url(${preview})`}}
            className={ image ? "has-image" : ""}
          >
            <input type="file"  onChange={event => setImage(event.target.files[0])}/>
            <MdImage size={27}/>
            <span>Adicione a capa</span>
          </label>

          <button>Adicionar livro</button>
        </form>

        <img src={Image} alt="Imagem de menina lendo livro" className="img" />
      </div>
    </div>
  );
}