// import { Cart } from "@chec/commerce.js/features/cart";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Products from "./components/Products/Products";
// import Navbar from "./components/Navbar/Navbar";
import { Products, Navbar, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    const data = response.data;
    setProducts(data);
  };

  const fetchCart = async () => {
    const data = await commerce.cart.retrieve();

    setCart(data);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    const data = response.cart;
    setCart(data);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    const data = response.cart;
    setCart(data);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    const data = response.cart;
    setCart(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log("Item added to Cart: ", cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/Cart">
            <Cart
              cart={cart}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
