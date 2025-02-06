import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [postsList, setPostsList] = useState({
    title: "",
    tags: "",
    content: "",
    image: "",
  });

  const fetchPosts = () => {
    axios.get("http://localhost:3000/posts").then(function (response) {
      setPosts(response.data);
    });
  };

  useEffect(fetchPosts, []);

  const handleField = (fieldName, value) => {
    setPostsList((currentPostsList) => ({
      ...currentPostsList,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Inviato");

    setPosts((currentPost) => [...currentPost, postsList]);

    setPostsList({
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
        {posts.map((post) => (
          <li key={post.title}>
            {post.title} <hr /> {post.tags} <hr /> {post.content} <hr />{" "}
            {post.image} <hr />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h3>Aggiungi un post</h3>
        <input
          type="text"
          value={postsList.title}
          onChange={(event) => handleField("title", event.target.value)}
          placeholder="Scrivi l'articolo"
        />
        <input
          type="text"
          value={postsList.tags}
          onChange={(event) => handleField("tags", event.target.value)}
          placeholder="Scrivi dei tag"
        />
        <input
          type="text"
          value={postsList.content}
          onChange={(event) => handleField("content", event.target.value)}
          placeholder="Scrivi il contenuto"
        />
        <input
          type="text"
          value={postsList.image}
          onChange={(event) => handleField("image", event.target.value)}
          placeholder="Inserisci URL immagine"
        />

        <button type="submit">Invia</button>
      </form>
    </>
  );
}
