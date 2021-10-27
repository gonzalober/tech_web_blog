import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Home = () => {
  const [loadingData, setLoadingData] = useState([]);
  const [userInput, setUserInput] = useState({
    title: "",
    content: "",
    username: "",
  });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const history = useHistory();

  let getPosts = () => {
    const url = `http://localhost:4000/api/posts/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoadingData(data);
        setLoading(false);
        setError(undefined);
      })
      .catch((er) => {
        console.error("Error:", er);
        setError(er.message);
        setLoading(false);
        setLoadingData([]);
      });
  };

  const addPost = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/posts/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(add()),
    })
      .then((res) => {
        res.text();
        getPosts();
      })
      .catch((err) => console.log(err));
  };

  const add = () => {
    loadingData.push(userInput);
    setLoadingData([...loadingData]);
    return userInput;
  };

  const deletePost = async (e) => {
    const saved = e.target.id;
    console.log(e.target.id);
    await fetch(`http://localhost:4000/api/posts/${e.target.id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    let resulArr = loadingData.filter((post) => +post.id !== +saved);
    setLoadingData(resulArr);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const routeEdit = (id) => {
    return history.push({ pathname: `edit/${id}` });
  };

  const routeReadArticle = (id) => {
    return history.push({ pathname: `full-article/${id}` });
  };

  return (
    <div className="main">
      <h1>Welcome to the Techie Blog!!!</h1>
      <div>
        {error && <div>{error}</div>}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <ul>
            {loadingData !== undefined && loadingData.length !== 0
              ? loadingData.map((obj, index) => {
                  return (
                    <div className="card" key={index}>
                      <span
                        className="title"
                        id={obj.id}
                        onClick={() => routeReadArticle(obj.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {obj.title}
                      </span>
                      <span>{obj.content}</span>
                      <span> WRITTEN BY: {obj.username}</span>
                      <span>{obj.createdat}</span>
                      <button
                        className="button"
                        id={obj.id}
                        onClick={() => routeEdit(obj.id)}
                      >
                        Edit your content Here!
                      </button>
                      <button
                        className="button"
                        id={obj.id}
                        onClick={deletePost}
                      >
                        delete your post
                      </button>
                    </div>
                  );
                })
              : null}
          </ul>
        )}
      </div>
      <div className="form">
        <form onSubmit={addPost}>
          <input
            className="form"
            type="name"
            placeholder="Insert the title of your blog"
            data-testid="post-title-input"
            onChange={({ target }) =>
              setUserInput((state) => ({ ...state, title: target.value }))
            }
            value={userInput.title}
            required
          />
          <input
            className="form"
            type="content"
            placeholder="Insert the content of your blog"
            data-testid="post-content-input"
            onChange={({ target }) =>
              setUserInput((state) => ({ ...state, content: target.value }))
            }
            value={userInput.content}
            required
          />
          <input
            className="form"
            type="username"
            placeholder="Insert your username"
            data-testid="post-username-input"
            onChange={({ target }) =>
              setUserInput((state) => ({ ...state, username: target.value }))
            }
            value={userInput.username}
            required
          />
          <button className="button">Insert your Post</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
