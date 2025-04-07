import React from "react";
import List from "./List";
import "../index.css";

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <>
      {items.length ? (
        <List
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>List is Empty</p>
      )}
    </>
  );
};

export default Content;
