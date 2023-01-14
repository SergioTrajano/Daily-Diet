import { View } from "react-native";
import { Container, Circle, HourText, MealText, TextDivider } from "./style";

type Props = {
    hour: string;
    meal: string;
    isInDiet: boolean;
};

export function MealCard({ hour, meal, isInDiet = true, ...rest }: Props) {
    return (
        <Container {...rest}>
            <HourText>{hour}</HourText>
            <TextDivider></TextDivider>
            <MealText>{meal}</MealText>
            <Circle isInDiet={isInDiet} />
        </Container>
    );
}
