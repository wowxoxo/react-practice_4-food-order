import { DUMMY_MEALS } from "../Meals/AvailableMeals";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {DUMMY_MEALS.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      <span>Cart</span>
      {cartItems}
    </Modal>
  );
};

export default Cart;
