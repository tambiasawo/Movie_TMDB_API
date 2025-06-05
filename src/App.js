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
  const [hasMore, setHasMore] = React.useState(true); // Optional: stop scroll if no more results
  const [error, setError] = React.useState(null);

  const REQUEST_URL =
    query !== ""
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=95ec914d7a53a26b5d95bd29bdafd041&include_adult=false&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=95ec914d7a53a26b5d95bd29bdafd041&with_networks=213&page=${page}`;

  // Unified fetch effect
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(REQUEST_URL);

        if (page === 1) {
          setItems(result.data.results); // Replace if first page or new query
        } else {
          setItems((prev) => [...prev, ...result.data.results]); // Append for infinite scroll
        }

        setHasMore(result.data.results.length > 0); // Optional, for "no more results"
        setError(null);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [page, query]);

  // Handle search input
  const handleQueryChange = (q) => {
    setItems([]);
    setPage(1);
    setQuery(q);
    setHasMore(true);
  };

  // Infinite scroll logic
  const onPageChange = () => {
    if (!hasMore || isLoading) return;

    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage((prev) => prev + 1);
    }
  };

  // Attach scroll event listener
  React.useEffect(() => {
    window.addEventListener("scroll", onPageChange);
    return () => window.removeEventListener("scroll", onPageChange);
  }, [isLoading, hasMore]);

  return (
    <div className="container">
      <Header />
      <Search getQuery={handleQueryChange} />
      <CharacterGrid
        isLoading={isLoading}
        items={items}
        onPageChange={onPageChange}
        error={error}
      />
    </div>
  );
}
