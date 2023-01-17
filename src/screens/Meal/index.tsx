import {
    Container,
    MealDataContainer,
    MealInfo,
    MealName,
    StatusContainer,
    Text,
    Wrapper,
    StatusText,
    CircleStatus,
    ButtonsContainer,
    ModalContainer,
    Modal,
    ModalText,
    ModalButtonsContainer,
    ButtonWrapper,
} from "./style";

import { Header } from "@components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { mealGetById } from "@storage/meals/mealGetById";
import { Button } from "@components/Button";

import { mealRemove } from "@storage/meals/mealRemove";

type RouteParams = {
    mealId: number;
};

export function Meal() {
    const { params } = useRoute();
    const { mealId } = params as RouteParams;

    const [name, setName] = useState<string | undefined>("");
    const [description, setDescription] = useState<string | undefined>("");
    const [hour, setHour] = useState<string | undefined>("");
    const [date, setDate] = useState<string | undefined>("");
    const [isInDiet, setIsInDiet] = useState<boolean | undefined>(false);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    function handleEdit() {
        navigate("newMeal", { mealId });
    }

    async function handleRemove() {
        try {
            await mealRemove(mealId);

            navigate("home");
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchMeal() {
        try {
            const meal = await mealGetById(mealId);

            setName(meal?.name);
            setDescription(meal?.description);
            setDate(meal?.date);
            setHour(meal?.hour);
            setIsInDiet(meal?.isInDiet);
        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    useEffect(() => {
        fetchMeal();
    }, []);

    return (
        <>
            <ModalContainer style={{ display: isModalVisible ? "flex" : "none" }}>
                <Modal>
                    <ModalText>Deseja realmente excluir o registro da refeição?</ModalText>

                    <ModalButtonsContainer>
                        <ButtonWrapper>
                            <Button
                                title="cancelar"
                                type="SECONDARY"
                                onPress={() => setIsModalVisible(false)}
                            />
                        </ButtonWrapper>

                        <ButtonWrapper>
                            <Button
                                title="Sim, excluir"
                                type="PRIMARRY"
                                onPress={() => handleRemove()}
                            />
                        </ButtonWrapper>
                    </ModalButtonsContainer>
                </Modal>
            </ModalContainer>
            <Container>
                <Header
                    type="PRIMARY"
                    text="Refeição"
                />

                <MealDataContainer>
                    <View>
                        <Wrapper>
                            <MealName>{name}</MealName>
                            <MealInfo>{description}</MealInfo>
                        </Wrapper>

                        <Wrapper>
                            <Text>Data e Hora</Text>
                            <MealInfo>
                                {date} às {hour}
                            </MealInfo>
                        </Wrapper>

                        <StatusContainer type={isInDiet ? "PRIMARY" : "SECONDARY"}>
                            <CircleStatus type={isInDiet ? "PRIMARY" : "SECONDARY"} />

                            <StatusText>
                                {isInDiet ? "dentro da dieta" : "fora da dieta"}
                            </StatusText>
                        </StatusContainer>
                    </View>

                    <ButtonsContainer>
                        <Button
                            title="Editar refeição"
                            type="PRIMARRY"
                            icon="edit-3"
                            onPress={() => handleEdit()}
                        />
                        <Button
                            title="Excluir refeição"
                            type="SECONDARY"
                            icon="trash-2"
                            onPress={() => setIsModalVisible(true)}
                        />
                    </ButtonsContainer>
                </MealDataContainer>
            </Container>
        </>
    );
}
