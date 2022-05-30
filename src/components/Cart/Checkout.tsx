import React from "react";
import { useRef, useState } from "react";
import { isEmail, isEmpty, isSixChars } from "../../utils/validators";
import classes from "./Checkout.module.css";

interface CheckoutBody {
  // name: string,
  // email: string,
  // city: string
  // street: string,
  // postalCode: string
  [key: string]: string | undefined;
}

interface CheckoutProps {
  onConfirm: (body: CheckoutBody) => void;
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Checkout = (props: CheckoutProps) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    email: true,
    city: true,
    street: true,
    postalCode: true
  });

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value;
    const enteredEmail = emailInputRef.current?.value;
    const enteredCity = cityInputRef.current?.value;
    const enteredStreet = streetInputRef.current?.value;
    const enteredPostalCode = postalCodeInputRef.current?.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredEmailIsValid = isEmail(enteredEmail);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      email: enteredEmail,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
