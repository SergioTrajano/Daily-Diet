import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS_COLLECTION } from "@storage/storageConfig";
import { mealGetAll } from "./mealGetAll";

export async function mealRemove(id: number) {
    try {
        const storedMeals = await mealGetAll();

        const storage = storedMeals.filter((meal) => meal.id !== id);

        await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(storage));
    } catch (error) {
        throw error;
    }
}
