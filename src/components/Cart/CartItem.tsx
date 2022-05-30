import { CartItemI } from "../../store/cart-context";
import classes from "./CartItem.module.css";

// type CartItemProps = {
//   id?: CartItemI["id"];
//   name: CartItemI["name"];
//   price: CartItemI["price"];
//   amount: CartItemI["amount"];
//   onRemove: () => void;
//   onAdd: () => void;
// };

// interface MyFile extends File {

// }

// new dsjdsd(file: File) {
//   file.las
// }

interface CartItemProps extends Omit<CartItemI, "desc" | "id"> {
  id?: CartItemI["id"];
  onRemove: () => void;
  onAdd: () => void;
}

const CartItem = (props: CartItemProps) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
