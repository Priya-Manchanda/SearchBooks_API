import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import ParticlesBg from "particles-bg";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://openlibrary.org/search.json?author=tolkien")
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  if (loading) {
    return (
      <>
        <h1 style={{ textAlign: "center", marginTop: "250px" }}>Loading...</h1>
        <ParticlesBg color="#1087e7" type="fountain" bg={true} />
      </>
    );
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (!data.docs) {
    return null;
  }

  let x = data.docs;
  let y = data.docs;

  const searchHandler = (search) => {
    setSearch(search);
    if (search !== "") {
      const newBooksList = y.filter((i) => {
        return Object.values(i)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResults(newBooksList);
    } else {
      setSearchResults(y);
    }
  };

  console.log(searchResults);

  return (
    <>
      <div className="container">
        <Search term={search} searchKey={searchHandler} />
        {search.length < 1 ? (
          <ul className="list">
            {x.map((item, i) => {
              return (
                <li key={i} className="list-item">
                  <i className="fa fa-book"></i>
                  &nbsp;
                  {item.title}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="list">
            {searchResults.map((item, i) => {
              return (
                <li key={i} className="list-item">
                  <i className="fa fa-book"></i>
                  &nbsp;
                  {item.title}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ParticlesBg color="#1087e7" type="cobweb" bg={true} />
    </>
  );
}
export default App;
