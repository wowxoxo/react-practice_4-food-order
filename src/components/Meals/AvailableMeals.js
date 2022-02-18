import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-practice-a3a21-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          ...responseData[key],
          id: key
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setHttpError(error.message);
    });

    // try {
    //   fetchMeals();
    // } catch (error) {
    //   setHttpError(error.message);
    // }
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      desc={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));

  if (isLoading) {
    return (
      <section className={classes.MealsIsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {/* {isLoading && <p>Loading...</p>} */}
      </Card>
    </section>
  );
};

export default AvailableMeals;
