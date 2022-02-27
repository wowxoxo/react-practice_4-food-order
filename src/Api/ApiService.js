export default class TaskService {
    static async getMeals() {

        const response = await fetch(
            "https://react-practice-a3a21-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        return responseData
    };

    static async submitOrder(userData, orderedItems) {
        const response = await fetch(
            "https://react-practice-a3a21-default-rtdb.firebaseio.com/meals-orders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userData,
                    orderedItems: orderedItems
                })
            }
        );
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        return responseData
    };
}

