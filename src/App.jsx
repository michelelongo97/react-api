import { useState } from "react";

export default function App() {
  const [article, setArticle] = useState([]);
  const [articleList, setArticleList] = useState({
    title: "",
    author: "",
    content: "",
    type: "",
  });

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
      author: "",
      content: "",
      type: "",
    });
  };

  return (
    <>
      <h1>Lista di articoli</h1>
      <ul>
        {article.map((item) => (
          <li key={item.title}>
            {item.title} - {item.author} - {item.content} - {item.type}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h3>Aggiungi articolo</h3>
        <input
          type="text"
          value={articleList.title}
          onChange={(event) => handleField("title", event.target.value)}
          placeholder="Scrivi l'articolo"
        />
        <input
          type="text"
          value={articleList.author}
          onChange={(event) => handleField("author", event.target.value)}
          placeholder="Scrivi l'autore"
        />
        <input
          type="text"
          value={articleList.content}
          onChange={(event) => handleField("content", event.target.value)}
          placeholder="Scrivi il contenuto"
        />
        <select
          value={articleList.type}
          onChange={(event) => handleField("type", event.target.value)}
        >
          <option value="FrontEnd">FrontEnd</option>
          <option value="BackEnd">BackEnd</option>
          <option value="UI/UX">UI/UX</option>
        </select>
        <button type="submit">Invia</button>
      </form>
    </>
  );
}
