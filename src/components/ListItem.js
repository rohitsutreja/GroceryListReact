import React from "react";
import { FaTrash } from "react-icons/fa";
import "../index.css";

const ListItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => handleCheck(item.id)}
      />
      <label style={item.checked ? { textDecoration: "line-through" } : null}>
        {item.name}
      </label>
      <FaTrash role="button" onClick={() => handleDelete(item.id)} />
    </li>
  );
};

export default ListItem;
