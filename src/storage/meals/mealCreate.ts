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

        const storage = [...storedMeals, { ...newMealData, id: id + 1 }];

        const storageOrderd = orderMealsByDateTime(storage);

        await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(storageOrderd));
        await AsyncStorage.setItem(ID, JSON.stringify(id + 1));
    } catch (error) {
        throw error;
    }
}

function orderMealsByDateTime(meals: MealStorageDTO[]) {
    const mealsSortedByDate: MealStorageDTO[] = meals.sort((a, b) => {
        const dateA: string[] = a.date.split("/");
        const timeA: string[] = a.hour.split(":");

        const dateB: string[] = b.date.split("/");
        const timeB: string[] = b.hour.split(":");

        const result =
            new Date(
                Number(dateB[2]),
                Number(dateB[1]),
                Number(dateB[0]),
                Number(timeB[0]),
                Number(timeB[1])
            ).getTime() -
            new Date(
                Number(dateA[2]),
                Number(dateA[1]),
                Number(dateA[0]),
                Number(timeA[0]),
                Number(timeA[1])
            ).getTime();

        return result;
    });

    return mealsSortedByDate;
}
