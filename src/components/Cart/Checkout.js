import { isEmpty, isSixChars } from "../../utils/validators";
import classes from "./Checkout.module.css";
import useInput from "../Hooks/use-input";

const Checkout = (props) => {

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameValueChangeHandler,
    inputBlurHandler: nameInputBlurHandler
  } = useInput(isEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailValueChangeHandler,
    inputBlurHandler: emailInputBlurHandler
  } = useInput((value) => value.trim().length > 2 && value.includes('@'));

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityValueChangeHandler,
    inputBlurHandler: cityInputBlurHandler
  } = useInput(isEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetValueChangeHandler,
    inputBlurHandler: streetInputBlurHandler
  } = useInput(isEmpty);


  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeValueChangeHandler,
    inputBlurHandler: postalCodeInputBlurHandler
  } = useInput(isSixChars);


  let formIsValid = false
  if (nameIsValid && cityIsValid && emailIsValid && streetIsValid && postalCodeIsValid) {
    formIsValid = true
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      email: emailValue,
      city: cityValue,
      street: streetValue,
      postalCode: postalCodeValue
    });
  };

  const nameControlClasses = `${classes.control} ${nameHasError ? classes.invalid : ""
    }`;

  const nameInput =
    <div className={nameControlClasses}>
      <label htmlFor='name'>Name</label>
      <input
        type="text"
        id="name"
        onChange={nameValueChangeHandler}
        onBlur={nameInputBlurHandler}
        value={nameValue}
      />
      {nameHasError && (
        <p className="error-text">Please enter a valid name!</p>
      )}
    </div>

  const emailControlClasses = `${classes.control} ${emailHasError ? classes.invalid : ""
    }`;

  const emailInput =
    <div className={emailControlClasses}>
      <label htmlFor='email'>Email</label>
      <input
        type="email"
        id="email"
        onChange={emailValueChangeHandler}
        onBlur={emailInputBlurHandler}
        value={emailValue}
      />
      {emailHasError && (
        <p className="error-text">Please enter a valid email!</p>
      )}
    </div>

  const cityControlClasses = `${classes.control} ${cityHasError ? classes.invalid : ""
    }`;

  const cityInput =
    <div className={cityControlClasses}>
      <label htmlFor='city'>City</label>
      <input
        type="text"
        id="city"
        onChange={cityValueChangeHandler}
        onBlur={cityInputBlurHandler}
        value={cityValue}
      />
      {cityHasError && (
        <p className="error-text">Please enter a valid city!</p>
      )}
    </div>

  const streetControlClasses = `${classes.control} ${streetHasError ? classes.invalid : ""
    }`;

  const streetInput =
    <div className={streetControlClasses}>
      <label htmlFor='street'>Street</label>
      <input
        type="text"
        id="street"
        onChange={streetValueChangeHandler}
        onBlur={streetInputBlurHandler}
        value={streetValue}
      />
      {streetHasError && (
        <p className="error-text">Please enter a valid street!</p>
      )}
    </div>

  const postalCodeControlClasses = `${classes.control} ${postalCodeHasError ? classes.invalid : ""
    }`;

  const postalCodeInput =
    <div className={postalCodeControlClasses}>
      <label htmlFor='postal'>Postal code</label>
      <input
        type="text"
        id="postal"
        onChange={postalCodeValueChangeHandler}
        onBlur={postalCodeInputBlurHandler}
        value={postalCodeValue}
      />
      {postalCodeHasError && (
        <p className="error-text">Please enter a valid postal code!</p>
      )}
    </div>


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {nameInput}
      {emailInput}
      {cityInput}
      {streetInput}
      {postalCodeInput}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
