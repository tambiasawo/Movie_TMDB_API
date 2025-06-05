import * as React from "react";
import "./styles.css";
import axios from "axios";
import Header from "./components/ui/Header";
import CharacterGrid from "./components/characters/characterGrid";
import Search from "./components/ui/Search";

export default function App() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const REQUEST_URL =
    query !== ""
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=95ec914d7a53a26b5d95bd29bdafd041&include_adult=false&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=95ec914d7a53a26b5d95bd29bdafd041&with_networks=213&page=${page}`;

  React.useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(REQUEST_URL);
      if(query)  setItems(result.data.results); //use the change state func to update it
      else setItems(prev=>[...prev, ...result.data.results])
      setIsLoading(false); // done loading so set i to false
      console.log({query},result.data.results)
    };
    fetchItems();
  }, [REQUEST_URL]);

  const onPageChange = () => {
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (!isLoading && window.scrollY + clientHeight >= scrollHeight - 50)
      setPage((prev) => prev + 1);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onPageChange);

    return () => {
      window.removeEventListener("scroll", onPageChange);
    };
  }, []);

  return (
    <>
      <div className="container">
        <Header />
        <Search getQuery={(q) => setQuery(q)} />
        <CharacterGrid
          isLoading={isLoading}
          items={items}
          onPageChange={onPageChange}
          error={error}
        />
      </div>
    </>
  );
}
