import AsyncStorage from "@react-native-async-storage/async-storage";
import { ID, MEALS_COLLECTION } from "@storage/storageConfig";
import { mealGetAll } from "./mealGetAll";
import { MealStorageDTO } from "./mealStorageDTO";

type Props = Omit<MealStorageDTO, "id">;

export async function mealCreate(newMealData: Props) {
    try {
        const storedMeals = await mealGetAll();
        const storedId = await AsyncStorage.getItem(ID);

        const id = storedId ? JSON.parse(storedId) : 0;

        const storage = JSON.stringify([...storedMeals, { ...newMealData, id: id + 1 }]);

        await AsyncStorage.setItem(MEALS_COLLECTION, storage);
        await AsyncStorage.setItem(ID, JSON.stringify(id + 1));
    } catch (error) {
        throw error;
    }
}
