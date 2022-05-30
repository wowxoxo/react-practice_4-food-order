import React from "react";

export interface CartItemI {
  id: string;
  name: string;
  desc: string;
  amount: number;
  price: number;
}

interface CartContextInterface {
  items: Array<CartItemI>;
  totalAmount: number;
  addItem: (item: CartItemI) => void;
  removeItem: (id: CartItemI["id"]) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextInterface>({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export default CartContext;
