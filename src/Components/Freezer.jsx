import React, { useState } from "react";

export default function Freezer({ items, setItems }) {
  // Input values
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  //////////////////////////////////////////////////
  const [modifyQuantity, setModifyQuantity] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);
  const [isVisibleF, setIsVisibleF] = useState(false);
  const isText = isVisibleF ? "Close add form" : "Add item";
  const [isVisibleUpdateF, setIsVisibleUpdateF] = useState(false);
  const updateText = isVisibleUpdateF ? "Close modification" : "Update item";

  ////////// FUNCTIONS //////////

  const toggleVisibilityAddFr = () => {
    setIsVisibleF(!isVisibleF);
  };

  const toggleVisibilityUpdateF = (index) => {
    setIsVisibleUpdateF(!isVisibleUpdateF);
    setUpdateIndex(index);
  };

  const handleAdd = () => {
    if (newItem.length < 1 || newQuantity.length < 1) {
      alert("The name and quantity fields mustn't be empty.");
    } else {
      setItems([...items, { name: newItem, quantity: newQuantity }]);
      setNewItem("");
      setNewQuantity("");
    }
  };
  const handleDeleteF = (index) => {
    const newList = items.filter((_, i) => {
      return i !== index;
    });
    setItems(newList);
  };

  const handleUpdate = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = modifyQuantity;
    setItems(updatedItems);
    setModifyQuantity("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h3>Freezer items</h3>
      <ul className="fridge-ul main-item-style">
        {items.map((item, index) => {
          return (
            <li className="fridge-li-element" key={index}>
              {item.name} - {item.quantity}
              <div className="btns-container">
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteF(index)}
                >
                  Delete item
                </button>
                <button
                  className="btn btn-update"
                  onClick={toggleVisibilityUpdateF}
                >
                  {updateText}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <button className="btn btn-others" onClick={toggleVisibilityAddFr}>
        {isText}
      </button>
      <form
        className={`quantity-update-form main-item-style fridge-form-update-quantity ${
          isVisibleUpdateF ? "fridge-form-update-quantity" : "hiddenUpdateForm"
        }`}
        method="GET"
        action="#"
        onSubmit={handleSubmit}
      >
        <label htmlFor="updateQuantityIdF"> New quantity:</label>
        <input
          type="text"
          name="updateQuantity"
          id="updateQuantityIdF"
          placeholder="ex. 1 kg"
          value={modifyQuantity}
          onChange={(e) => setModifyQuantity(e.target.value)}
        />
        <input
          type="submit"
          value="Update quantity"
          className="btn btn-others"
          onClick={() => handleUpdate(updateIndex)}
        />
      </form>
      <form
        className={`main-item-style fridge-form-update ${
          isVisibleF ? "visible" : "hidden"
        }`}
        method="GET"
        action="#"
        onSubmit={handleSubmit}
      >
        <div className="input-container">
          <label className="form-label" htmlFor="newItemNameIdF">
            New item name
          </label>
          <input
            type="text"
            name="newItemName"
            id="newItemNameIdF"
            placeholder="ex. froozen fish"
            value={newItem}
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="newItemQuantityIdF">
            New item quantity
          </label>
          <input
            type="text"
            name="newItemQuantity"
            id="newItemQuantityIdF"
            placeholder="ex. 1 package"
            value={newQuantity}
            onChange={(e) => {
              setNewQuantity(e.target.value);
            }}
          />
        </div>
        <input
          className="btn btn-others centerBtn"
          type="submit"
          value="Update"
          onClick={handleAdd}
        />
      </form>
    </>
  );
}