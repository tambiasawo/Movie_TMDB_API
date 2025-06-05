import React from "react";
import CharacterItem from "./characterItem";
import CircularProgress from "@mui/material/CircularProgress";

const characterGrid = ({ isLoading, items, error }) => {
  return (
    <div>
      {error && <p>{error}</p>}
      {items.length === 0 && !isLoading && (
        <div style={{ display: "grid", placeItems: "center" }}>
          {" "}
          No Movies Found. Try Again
        </div>
      )}
      {!error && items.length && (
        <div>
          <section className="cards">
            {items.map((item) => (
              <CharacterItem key={item.id} item={item}></CharacterItem>
            ))}
          </section>
          <div
            style={{
              background: "white",
              display: "grid",
              placeItems: "center",
              marginTop: "20px",
              padding: 10,
            }}
          ></div>
        </div>
      )}

      {isLoading && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default characterGrid;
