import { useReducer } from "react";
import CartContext, { CartItemI } from "./cart-context";

type State = {
  items: CartItemI[],
  totalAmount: number
}

const defaultState: State = {
  items: [],
  totalAmount: 0
};

// try {
//   // fetch
//   new Error('Amds')
//   // Mongo.
// } catch (error) {
//   console.log(error.message)
//   console.log((error as Error).message)
// }

enum ActionType {
  ADD = "ADD",
  REMOVE = "REMOVE",
  CLEAR = "CLEAR"
}
// type ACTION = { type: ActionType, item: CartItemI, id: string }
type ACTION = { type: ActionType.ADD, item: CartItemI } | { type: ActionType.REMOVE, id: string, } | { type: ActionType.CLEAR}
// type ACTION = { type: ActionType, payload: CartItemI | string }

// const cartReducer = (state: typeof defaultState, action) => {
const cartReducer = (state: typeof defaultState, action: ACTION) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "CLEAR") {
    return defaultState;
  }

  return defaultState;
};

const CartProvider = (props: { children: React.ReactNode }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

  const addItemToCartHandler = (item: CartItemI) => {
    dispatchCartAction({ type: ActionType.ADD, item });
  };

  const removeItemFromCartHandler = (id: CartItemI["id"]) => {
    dispatchCartAction({ type: ActionType.REMOVE, id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: ActionType.CLEAR });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );

};

export default CartProvider;
