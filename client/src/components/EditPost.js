import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

const EditPost = () => {
  const location = useLocation();
  const text = useRef("");
  const [dataAvailable, setdataAvailable] = useState();
  const [upDatedContent, setUpDatedContent] = useState("");

  const handleChange = (e) => {
    text.current = e.target.value;
  };
  console.log(upDatedContent);
  const editPost = async () => {
    await fetch(`http://localhost:4000/api/posts/${dataAvailable[0].id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upDatedContent),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setdataAvailable(location.data);
    setUpDatedContent(text.current);
  }, []);

  return (
    <div className="main">
      <div>
        {dataAvailable !== undefined && dataAvailable.length !== 0 ? (
          <form onSubmit={editPost}>
            <ContentEditable
              html={dataAvailable[0].content}
              disabled={false}
              onChange={handleChange}
            />
            <button className="button">Update your Post</button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default EditPost;
