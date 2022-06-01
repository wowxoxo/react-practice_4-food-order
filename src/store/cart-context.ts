import React from "react";

export interface CartItemI {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface CartItemWithDescI extends CartItemI {
  desc: string;
}

export interface CartContextInterface {
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

// export default CartContext.Provider

export default CartContext;
