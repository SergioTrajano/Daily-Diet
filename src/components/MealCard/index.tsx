import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
    Container,
    Circle,
    HourText,
    MealText,
    TextDivider,
    MealInfoWrapper,
    Title,
} from "./style";

type Props = {
    title: string;
    data: mealProps[];
};

type mealProps = {
    id: number;
    hour: string;
    name: string;
    isInDiet: boolean;
};

export function MealCard({ title, data, ...rest }: Props) {
    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    function handleMeal(id: number) {
        navigate("meal", { mealId: id });
    }

    return (
        <Container>
            <FlatList
                data={data}
                keyExtractor={(item: mealProps) => `${item.id}`}
                renderItem={({ item }: { item: mealProps }) => (
                    <MealInfoWrapper
                        onPress={() => handleMeal(item.id)}
                        {...rest}
                    >
                        <HourText>{item.hour}</HourText>
                        <TextDivider></TextDivider>
                        <MealText>{item.name}</MealText>
                        <Circle isInDiet={item.isInDiet} />
                    </MealInfoWrapper>
                )}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Title>{title}</Title>}
            />
        </Container>
    );
}
