import { mealGetAll } from "./mealGetAll";

export async function mealGetById(id: number) {
    try {
        const storedMeal = await mealGetAll();

        return storedMeal.find((meal) => meal.id === id);
    } catch (error) {
        throw error;
    }
}
