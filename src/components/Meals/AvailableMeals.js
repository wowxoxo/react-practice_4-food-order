import { useEffect, useState, useCallback } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import TaskService from "../../Api/ApiService";
import { useFetch } from "../Hooks/use-fetch";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const transformAndSetMeals = useCallback((mealObj) => {
    const loadedMeals = [];

    for (const key in mealObj) {
      loadedMeals.push({
        ...mealObj[key],
        id: key
      });
    }
    setMeals(loadedMeals);
  }, []);

  const loadMeals = useCallback(async () => {
    const response = await TaskService.getMeals();
    transformAndSetMeals(response);
  }, [transformAndSetMeals]);

  const [isLoading, error, fetchMeals] = useFetch(loadMeals);

  useEffect(() => {
    fetchMeals()
  }, [fetchMeals]);

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

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
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
