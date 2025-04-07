import React from "react";
import ListItem from "./ListItem";
import "../index.css";

const List = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul className="itemList">
      {items.map((item) => (
        <ListItem
          item={item}
          key={item.id}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default List;
