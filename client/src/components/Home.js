import React, { useEffect, useState } from "react";

const Home = () => {
  const [loadingData, setLoadingData] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

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
        res.json();
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
      .then((res) => res.json())
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

  return (
    <div className="main">
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
                      <span>{obj.title}</span>
                      <span>{obj.content}</span>
                      <span>{obj.username}</span>
                      <span>{obj.createdat}</span>
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
          />
          <button className="button">Insert your Post</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
