import { Loading } from "@components/Loading";
import { Status } from "@components/Status";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { mealGetAll } from "@storage/meals/mealGetAll";
import { MealStorageDTO } from "@storage/meals/mealStorageDTO";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import {
    Container,
    Regulartext,
    SmallStatsContainer,
    StatisticsContainer,
    Stats,
    StrongText,
    Title,
} from "./style";

export function Statistics() {
    const [biggerMealsInDietStreak, setBiggerMealsInDietStreak] = useState<number>(0);
    const [mealsNumber, setMealsNumber] = useState<number>(0);
    const [mealsInDiet, setMealsInDiet] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    async function fetchMeals() {
        setIsLoading(true);

        try {
            const storedMeals = await mealGetAll();

            const biggerMealsInDietStreak = getBetterStreak(storedMeals);
            const mealsInDiet = countMealsType(storedMeals);

            setMealsNumber(storedMeals.length);
            setBiggerMealsInDietStreak(biggerMealsInDietStreak);
            setMealsInDiet(mealsInDiet);

            setIsLoading(false);
        } catch (error) {
            console.log(error);

            Alert.alert("Erro de carregamento", "Não foi possível carregar as informações.");

            navigate("home");
        }
    }

    function getBetterStreak(meals: MealStorageDTO[]) {
        let biggerStreak = 0;
        let aux = 0;

        for (const meal of meals) {
            if (aux > biggerStreak) {
                biggerStreak = aux;
            }
            if (meal.isInDiet === false) {
                aux = 0;
                continue;
            }

            aux++;
        }

        return biggerStreak;
    }

    function countMealsType(meals: MealStorageDTO[]) {
        let inDiet = 0;

        for (const meal of meals) {
            if (meal.isInDiet) inDiet++;
        }

        return inDiet;
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
                <Status
                    icon="arrow-left"
                    iconPosition="LEFT"
                    porcentage={(mealsInDiet / mealsNumber) * 100}
                    type="PRIMARY"
                    onClick={() => navigate("home")}
                />

                <StatisticsContainer>
                    <Title>Estatísticas gerais</Title>

                    <Stats
                        Size="LARGE"
                        type="DEFAULT"
                    >
                        <StrongText>{biggerMealsInDietStreak}</StrongText>
                        <Regulartext>melhor sequência de pratos dentro da dieta</Regulartext>
                    </Stats>

                    <Stats
                        Size="LARGE"
                        type="DEFAULT"
                    >
                        <StrongText>{mealsNumber}</StrongText>
                        <Regulartext>refeições registradas</Regulartext>
                    </Stats>

                    <SmallStatsContainer>
                        <Stats
                            Size="SMALL"
                            type="PRIMARY"
                        >
                            <StrongText>{mealsInDiet}</StrongText>
                            <Regulartext>refeições dentro da dieta</Regulartext>
                        </Stats>

                        <Stats
                            Size="SMALL"
                            type="SECONDARY"
                        >
                            <StrongText>{mealsNumber - mealsInDiet}</StrongText>
                            <Regulartext>refeições fora da dieta</Regulartext>
                        </Stats>
                    </SmallStatsContainer>
                </StatisticsContainer>
            </Container>
        </>
    );
}
