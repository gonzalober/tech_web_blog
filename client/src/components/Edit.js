import { useHistory } from "react-router-dom";

const Edit = () => {
  const history = useHistory();
  // const [loadingData, setLoadingData] = useState([]);
  // const [userInput, setUserInput] = useState({
  //   title: "",
  //   content: "",
  //   username: "",
  // });
  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState();

  // let getPosts = () => {
  //   const url = `http://localhost:4000/api/posts/`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLoadingData(data);
  //       setLoading(false);
  //       setError(undefined);
  //     })
  //     .catch((er) => {
  //       console.error("Error:", er);
  //       setError(er.message);
  //       setLoading(false);
  //       setLoadingData([]);
  //     });
  // };

  return (
    <div className="main">
      <div>Hola</div>
    </div>
  );
};

export default Edit;
