import "./index.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";

import apiRequest from "./api/apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items/";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw Error("Unexpected Error");
        const items = await res.json();
        setItems(items);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(fetchItems, 500);
  }, []);

  const handleCheck = async (id) => {
    const newItemsData = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newItemsData);

    const updatedItem = newItemsData.find((item) => item.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: updatedItem.checked }),
    };

    const result = await apiRequest(`${API_URL}${id}`, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);

    const deleteOptions = {
      method: "DELETE",
    };

    const result = await apiRequest(`${API_URL}${id}`, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const addItem = async (itemName) => {
    const newItem = {
      id: items.length ? items[items.length - 1].id + 1 : 1,
      name: itemName,
      checked: false,
    };

    const newItems = [...items, newItem];
    setItems(newItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };

    const result = await apiRequest(API_URL, postOptions);

    if (result) {
      setFetchError(result);
    }
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <SearchItem search={search} setSearch={setSearch} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <main>
        {isLoading && <p>Loading Items</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
