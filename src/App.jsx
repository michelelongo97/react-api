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

    axios.post("http://localhost:3000/posts", postsList).then((response) => {
      setPosts((currentPost) => [...currentPost, response.data]);
    });

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
          <li key={post.id}>
            <h2>{post.title}</h2> <h5> {post.tags}</h5> <p>{post.content}</p>
            <br /> <img src={post.image} alt={post.title} />
          </li>
        ))}
      </ul>
      <hr />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3>Aggiungi un post</h3>
          <div className="row">
            <div>
              <input
                type="text"
                value={postsList.title}
                onChange={(event) => handleField("title", event.target.value)}
                placeholder="Scrivi l'articolo"
              />
            </div>
            <div>
              <input
                type="text"
                value={postsList.tags}
                onChange={(event) => handleField("tags", event.target.value)}
                placeholder="Scrivi dei tag"
              />
            </div>
            <div>
              <input
                type="text"
                value={postsList.content}
                onChange={(event) => handleField("content", event.target.value)}
                placeholder="Scrivi il contenuto"
                className="content"
              />
            </div>
            <div>
              <input
                type="text"
                value={postsList.image}
                onChange={(event) => handleField("image", event.target.value)}
                placeholder="Inserisci URL immagine"
              />
            </div>
            <div>
              <button type="submit">Invia</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
