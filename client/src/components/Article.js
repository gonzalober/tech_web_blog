import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

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

  useEffect(() => {
    getPost(id);
  }, [id]);
  console.log(id);
  console.log(dataAvailable);

  return (
    <div className="main">
      <div>
        {loadingData !== undefined && loadingData.length !== 0 ? (
          <div className="card">
            <span className="title" target="_blank" rel="noopener noreferrer">
              {dataAvailable.title}
            </span>
            <span>{dataAvailable.content}</span>
            <span>{dataAvailable.username}</span>
            <span>{dataAvailable.createdat}</span>
          </div>
        ) : null}
      </div>
      <button className="button" onClick={routeHome}>
        Home
      </button>
    </div>
  );
};

export default Article;
