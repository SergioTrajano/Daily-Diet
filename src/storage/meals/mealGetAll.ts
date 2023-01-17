import AsyncStorage from "@react-native-async-storage/async-storage";

import { MEALS_COLLECTION } from "@storage/storageConfig";
import { MealStorageDTO } from "./mealStorageDTO";

export async function mealGetAll() {
    try {
        const storedMeals = await AsyncStorage.getItem(MEALS_COLLECTION);

        const stored: MealStorageDTO[] = storedMeals ? JSON.parse(storedMeals) : [];

        return stored;
    } catch (error) {
        throw error;
    }
}
