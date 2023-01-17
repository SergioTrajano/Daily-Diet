import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "@storage/storageConfig";
import { mealGetAll } from "./mealGetAll";

import { MealStorageDTO } from "./mealStorageDTO";

type MealData = Omit<MealStorageDTO, "id">;

export async function mealUpdateById(id: number, mealData: MealData) {
    try {
        const storedMeals = await mealGetAll();

        const storage = storedMeals.map((meal) => {
            if (meal.id !== id) return meal;

            return { ...mealData, id };
        });

        await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(storage));
    } catch (error) {
        throw error;
    }
}
