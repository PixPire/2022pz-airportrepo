import { createContext, useState } from "react";
import React from "react";

const ShoppingCartContext = createContext({
  items: [],
  totalItems: 0,
  addToCart: (itemToCart) => {},
  removeFromCart: (item) => {},
  setActualItems: (items) => {},
});

export function ShoppingCartContextProvider(props) {
  const [cartItems, setCartItems] = useState([]);

  function addToCartHandler(itemToCart) {
    setCartItems((prevCartItems) => {
      return prevCartItems.concat(itemToCart);
    });
  }

  function removeFromCartHandler(itemId) {
    setCartItems(prevCartItems => {
      return prevCartItems.filter(item => item.id !== itemId);
    });
  }

  function setActualItemsHandler(items){
    return setCartItems(items);
  }

  const context = {
    items: cartItems,
    totalItems: cartItems.length,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    setActualItems: setActualItemsHandler,
  };

  return (
    <ShoppingCartContext.Provider value={context}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartContext;
