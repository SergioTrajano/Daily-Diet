import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, FlatList } from "react-native";

import { Container, Image, NewMeal, NewMealText } from "./style";

import Logo from "@assets/Logo.png";
import { Status } from "@components/Status";
import { Button } from "@components/Button";
import { MealCard } from "@components/MealCard";
import { ListEmpty } from "@components/ListEmpty";
import { mealGetAll } from "@storage/meals/mealGetAll";
import { MealStorageDTO } from "@storage/meals/mealStorageDTO";
import { Loading } from "@components/Loading";

type mealProps = {
    date: string;
    data: {
        id: number;
        hour: string;
        name: string;
        isInDiet: boolean;
        description: string;
    }[];
};

export function Home() {
    const [meals, setMeals] = useState<mealProps[]>([]);
    const [porcentage, setPorcentage] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    function handleStatus() {
        navigate("statistics");
    }

    function handleNewMeal() {
        navigate("newMeal", { mealId: undefined });
    }

    async function fetchMeals() {
        setIsLoading(true);

        try {
            const storedMeals = await mealGetAll();

            const mealsGroupedByDate: mealProps[] = groupMealsbyDate(storedMeals);

            setMeals(mealsGroupedByDate);
            setPorcentage(
                (storedMeals.filter((meal) => meal.isInDiet).length / storedMeals.length) * 100
            );
        } catch (error) {
            console.log(error);

            Alert.alert(
                "Error no carregamento",
                "Houve um erro no carregamento das informações. Tente novamente!"
            );
        } finally {
            setIsLoading(false);
        }
    }

    function groupMealsbyDate(meals: MealStorageDTO[]) {
        const dateHashTable: any = {};
        const mealsGroupedByDate: mealProps[] = [];

        for (let meal of meals) {
            const formatedDate = meal.date.split("/").join(".");

            if (dateHashTable[formatedDate] === undefined) {
                dateHashTable[formatedDate] = 0;

                mealsGroupedByDate.push({
                    date: formatedDate,
                    data: [],
                });
            }

            mealsGroupedByDate
                .find((mealGroup) => mealGroup.date === formatedDate)
                ?.data.push({
                    id: meal.id,
                    hour: meal.hour,
                    name: meal.name,
                    isInDiet: meal.isInDiet,
                    description: meal.description,
                });
        }

        return mealsGroupedByDate;
    }

    useFocusEffect(
        useCallback(() => {
            fetchMeals();
        }, [])
    );

    return (
        <>
            <Loading style={{ display: isLoading ? "flex" : "none" }} />
            <Container style={{ display: isLoading ? "none" : "flex" }}>
                <Image source={Logo} />
                <FlatList
                    data={meals}
                    keyExtractor={(item: mealProps, i: number) => `${item} + ${i}`}
                    renderItem={({ item }: { item: mealProps }) => (
                        <MealCard
                            title={item.date}
                            data={item.data}
                        />
                    )}
                    contentContainerStyle={meals.length === 0 && { flex: 1 }}
                    ListEmptyComponent={() => (
                        <ListEmpty message="Que tal cadastrar a primeira refeição?" />
                    )}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <>
                            <Status
                                icon="arrow-up-right"
                                porcentage={porcentage}
                                type={porcentage >= 70 ? "PRIMARY" : "SECONDARY"}
                                iconPosition="RIGHT"
                                onClick={() => handleStatus()}
                                style={isNaN(porcentage) && { display: "none" }}
                            />

                            <NewMeal>
                                <NewMealText>Refeições</NewMealText>
                                <Button
                                    title="Nova refeição"
                                    icon="plus"
                                    type="PRIMARRY"
                                    onPress={handleNewMeal}
                                />
                            </NewMeal>
                        </>
                    )}
                />
            </Container>
        </>
    );
}
