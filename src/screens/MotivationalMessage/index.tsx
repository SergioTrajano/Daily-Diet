import { Container, BoldMessage, ButtonWrapper, Image, Message, Title } from "./style";

import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import celebratingImage from "@assets/celebrating.png";
import upsetImage from "@assets/upset.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ParamsProps = {
    isInDiet: boolean;
};

export function MotivationalMessage() {
    const { params } = useRoute();
    const { isInDiet } = params as ParamsProps;

    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    function handleHome() {
        navigate("home");
    }

    return (
        <Container>
            <Title type={isInDiet ? "PRIMARY" : "SECONDARY"}>
                {isInDiet ? "Continue assim!" : "Que pena!"}
            </Title>

            <Message>
                {isInDiet ? "Você continua " : "Você "}
                <BoldMessage>{isInDiet ? "dentro da dieta. " : "saiu da dieta "}</BoldMessage>
                {isInDiet ? "Muito bem!" : "dessa vez, mas continue se esforçando e não desista!"}
            </Message>

            <Image source={isInDiet ? celebratingImage : upsetImage} />

            <ButtonWrapper>
                <Button
                    title="ir para a página inicial"
                    onPress={() => handleHome()}
                />
            </ButtonWrapper>
        </Container>
    );
}
