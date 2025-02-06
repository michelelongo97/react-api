import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [article, setArticle] = useState([]);
  const [articleList, setArticleList] = useState({
    title: "",
    tags: "",
    content: "",
    image: "",
  });

  const fetchArticle = () => {
    axios.get("http://localhost:3000/posts").then(function (response) {
      setArticle(response.data);
    });
  };

  useEffect(fetchArticle, []);

  const handleField = (fieldName, value) => {
    setArticleList((currentArticleList) => ({
      ...currentArticleList,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Inviato");

    setArticle((currentArticle) => [...currentArticle, articleList]);

    setArticleList({
      title: "",
      tags: "",
      content: "",
      image: "",
    });
  };

  return (
    <>
      <h1>Lista dei Post</h1>
      <ul>
        {article.map((item) => (
          <li key={item.title}>
            {item.title} <hr /> {item.tags} <hr /> {item.content} <hr />{" "}
            {item.image} <hr />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h3>Aggiungi un post</h3>
        <input
          type="text"
          value={articleList.title}
          onChange={(event) => handleField("title", event.target.value)}
          placeholder="Scrivi l'articolo"
        />
        <input
          type="text"
          value={articleList.tags}
          onChange={(event) => handleField("tags", event.target.value)}
          placeholder="Scrivi dei tag"
        />
        <input
          type="text"
          value={articleList.content}
          onChange={(event) => handleField("content", event.target.value)}
          placeholder="Scrivi il contenuto"
        />
        <input
          type="text"
          value={articleList.image}
          onChange={(event) => handleField("image", event.target.value)}
          placeholder="Inserisci URL immagine"
        />

        <button type="submit">Invia</button>
      </form>
    </>
  );
}
