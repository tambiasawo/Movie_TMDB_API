import React from "react";

const characterItem = ({ item }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img
            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            alt={item.original_title}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="card-back">
          <h1>{item.original_title}</h1>
          <ul>
            <li>
              <strong>Language:</strong> {item.original_language.toUpperCase()}
            </li>
            <li>
              <strong>Adult Content:</strong> {item.adult ? "Yes" : "No"}
            </li>
            <li>
              <strong>Release Date:</strong> {item.release_date}
            </li>
          </ul>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default characterItem;
