import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EditPost = () => {
  const [loadingData, setLoadingData] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [dataAvailable, setdataAvailable] = useState();

  let getPost = (id) => {
    const url = `http://localhost:4000/api/posts/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setdataAvailable(data[0]);
        setLoadingData(false);
        //   setError(undefined);
      })
      .catch((er) => {
        // console.error("Error:", er);
        // setError(er.message);
        // setLoading(false);
        // setLoadingData([]);
      });
  };
  const editPost = async (id, e) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAvailable),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  const routeHome = (event) => {
    event.preventDefault();
    let path = `/`;
    history.push(path);
  };
  console.log(id);
  return (
    <div className="main">
      <div>
        {loadingData !== undefined && loadingData.length !== 0 ? (
          <form onSubmit={(e) => editPost(id, e)}>
            <input
              className="form"
              disabled
              type="name"
              placeholder="Insert the title of your blog"
              data-testid="post-title-input"
              value={dataAvailable.title}
            />
            <textarea
              className="form"
              placeholder="Insert the content of your blog"
              data-testid="post-content-input"
              onChange={({ target }) =>
                setdataAvailable((state) => ({
                  ...state,
                  content: target.value,
                }))
              }
              value={dataAvailable.content}
            />
            <input
              className="form"
              type="username"
              disabled
              placeholder="Insert your username"
              data-testid="post-username-input"
              value={dataAvailable.username}
            />
            <button className="button">Edit your Post</button>
          </form>
        ) : null}
      </div>
      <button className="button" onClick={routeHome}>
        Home
      </button>
    </div>
  );
};

export default EditPost;
