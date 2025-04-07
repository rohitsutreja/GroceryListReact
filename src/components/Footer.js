import React from "react";
import "../index.css";

const Footer = ({ length }) => {
  return (
    <footer>
      <p>
        {length} List {length === 1 ? "Item" : "Items"}
      </p>
    </footer>
  );
};

export default Footer;
