import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import formatDate from "../formatDate";

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
    <div>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <a className="link-secondary" href="#"></a>
          </div>
          <div className="col-4 text-center">
            <h1 className="blog-header-logo text-dark">
              {`{The Tech-Corner Blog}`}
            </h1>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <a className="link-secondary" href="#" aria-label="Search"></a>
            <a className="btn btn-sm btn-outline-secondary" href="#"></a>
          </div>
        </div>
      </header>
      <div>
        {error && <div>{error}</div>}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <ul>
            {loadingData !== undefined && loadingData.length !== 0
              ? loadingData.map((obj, index) => {
                  return (
                    <>
                      <div className="row mb-2">
                        <div
                          className="wp-block-group bs-card-hover-zoom add-padding-top"
                          key={index}
                        >
                          <div className="col-md-6">
                            <div className="col p-4 d-flex flex-column position-static">
                              <h3
                                className="mb-0"
                                id={obj.id}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => routeReadArticle(obj.id)}
                              >
                                {obj.title}
                              </h3>
                              <div className="mb-1 text-muted">
                                {formatDate(obj.createdat)}
                              </div>
                              <p
                                className="card-text mb-auto"
                                onClick={() => routeReadArticle(obj.id)}
                              >
                                {obj.content.substring(0, 200)}
                              </p>
                              <a
                                href="#"
                                onClick={() => routeReadArticle(obj.id)}
                                className="stretched-link"
                              >
                                Continue reading
                              </a>
                            </div>
                            <p></p>
                            <p>
                              <span> WRITTEN BY: {obj.username}</span>
                            </p>
                            <p>
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
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
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
      <footer className="blog-footer">
        <p>
          Techie-Corner Blog
          <a> by Gonzalo</a>.
        </p>
        <p>
          <a href="#">Back to top</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
