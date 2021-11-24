import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import formatDate from "../formatDate";

const Article = () => {
  const [loadingData, setLoadingData] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const [dataAvailable, setdataAvailable] = useState();

  const routeHome = (event) => {
    event.preventDefault();
    let path = `/`;
    history.push(path);
  };

  let getPost = (id) => {
    const url = `${window.location.origin}/api/posts/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setdataAvailable(data[0]);
        setLoadingData(false);
      })
      .catch((er) => {
        console.error("Error:", er);
      });
  };

  useEffect(() => {
    getPost(id);
  }, [id]);
  console.log(id);
  console.log(dataAvailable);

  return (
    <div className="blog-post">
      <div>
        {loadingData !== undefined && loadingData.length !== 0 ? (
          <div>
            <h2 className="blog-post-title">{dataAvailable.title}</h2>
            <p className="blog-post-meta">
              {formatDate(dataAvailable.createdat)}{" "}
              <a href="#">{dataAvailable.username}</a>
            </p>
            <span className="font-content">{dataAvailable.content}</span>
          </div>
        ) : null}
      </div>
      <button className="button" onClick={routeHome}>
        Home
      </button>
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

export default Article;
