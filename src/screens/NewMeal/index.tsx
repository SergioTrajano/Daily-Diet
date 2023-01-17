import React, { useCallback, useRef, useState } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, TextInput, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "styled-components/native";

import { Header } from "@components/Header";
import themes from "@themes/index";
import { Button } from "@components/Button";
import { mealCreate } from "@storage/meals/mealCreate";
import { mealGetById } from "@storage/meals/mealGetById";
import { mealUpdateById } from "@storage/meals/mealUpdate";

import {
    Container,
    FormContainer,
    InRowWrapper,
    TimeInputWrapper,
    InputContainer,
    InputField,
    Label,
    Options,
    Circle,
} from "./style";

type RouteParams = {
    mealId?: number;
};

export function NewMeal() {
    const { COLOURS } = useTheme();
    const { params } = useRoute();
    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();
    const { mealId } = params as RouteParams;

    const dateRef = useRef<TextInput>(null);
    const hourRef = useRef<TextInput>(null);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [hour, setHour] = useState<string>("");

    const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState<boolean>(false);
    const [isDateFocused, setIsDateFocused] = useState<boolean>(false);
    const [isHourFocused, setIsHourFocused] = useState<boolean>(false);

    const [isInDietButtonSelected, setIsInDietButtonSelected] = useState<boolean>(false);
    const [notDietButtonSelected, setNotDietButtonSelected] = useState<boolean>(false);

    function isBorderBlack(isFocused: boolean, inputValue: string) {
        if (isFocused && inputValue !== "") return true;
        if (!isFocused && inputValue === "") return true;

        return false;
    }

    function handleInDiet() {
        setIsInDietButtonSelected(true);
        setNotDietButtonSelected(false);
    }

    function handleNotInDiet() {
        setIsInDietButtonSelected(false);
        setNotDietButtonSelected(true);
    }

    function formatDate(text: string) {
        if (text.length === 10) dateRef.current?.blur();
        if (text.length > 10) return;
        if ((date.length === 2 && text.length == 3) || (date.length === 5 && text.length == 6)) {
            return setDate(date + "/" + text[text.length - 1]);
        }
        if ((date.length === 4 && text.length === 3) || (date.length === 7 && text.length === 6)) {
            return setDate(text.slice(0, text.length - 1));
        }

        setDate(text);
    }

    function formatHour(text: string) {
        if (text.length === 5) hourRef.current?.blur();
        if (text.length > 5) return;
        if (hour.length === 2 && text.length == 3) {
            return setHour(hour + ":" + text[text.length - 1]);
        }
        if (hour.length === 4 && text.length === 3) {
            return setHour(text.slice(0, text.length - 1));
        }

        setHour(text);
    }

    async function submit() {
        const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
        const hourRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if (
            name.trim() === "" ||
            description.trim() === "" ||
            date === "" ||
            hour === "" ||
            (!isInDietButtonSelected && !notDietButtonSelected)
        ) {
            return Alert.alert("Nova refeição", "Todos os campos devem ser preenchidos.");
        }
        if (dateRegex.test(date) === false) {
            return Alert.alert("Data invalida", "Digite uma data válida no formato dd/mm/yyyy");
        }
        if (hourRegex.test(hour) === false) {
            return Alert.alert("Hora invalida", "Digite uma hora válida no formato hh/mm");
        }

        const isInDiet: boolean = isInDietButtonSelected && !notDietButtonSelected;

        const mealData = { name, description, date, hour, isInDiet };

        if (mealId) {
            await mealUpdateById(mealId, mealData);

            return navigate("meal", { mealId });
        }

        await mealCreate(mealData);

        navigate("motivationalMessage", { isInDiet });
    }

    async function fetchMealById() {
        const storedMeal = mealId ? await mealGetById(mealId) : undefined;

        if (storedMeal === undefined) return;

        setName(storedMeal.name);
        setDescription(storedMeal.description);
        setDate(storedMeal.date);
        setHour(storedMeal.hour);

        if (storedMeal.isInDiet) {
            return handleInDiet();
        }

        handleNotInDiet();
    }

    useFocusEffect(
        useCallback(() => {
            fetchMealById();
        }, [])
    );

    return (
        <Container>
            <Header
                text={mealId ? "Nova refeição" : "Editar Refeição"}
                type="TERTIARY"
            />

            <FormContainer>
                <View style={{ height: 430 }}>
                    <InputContainer size="SMALL">
                        <Label>Nome</Label>
                        <InputField
                            size="SMALL"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            onFocus={() => setIsNameFocused(true)}
                            onBlur={() => setIsNameFocused(false)}
                            style={
                                isBorderBlack(isNameFocused, name.trim())
                                    ? { borderColor: COLOURS.GRAY_500 }
                                    : { borderColor: COLOURS.GRAY_300 }
                            }
                        />
                    </InputContainer>

                    <InputContainer size="LARGE">
                        <Label>Descrição</Label>
                        <InputField
                            size="SMALL"
                            multiline={true}
                            textAlignVertical="top"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            onFocus={() => setIsDescriptionFocused(true)}
                            onBlur={() => setIsDescriptionFocused(false)}
                            style={
                                isBorderBlack(isDescriptionFocused, description.trim())
                                    ? { borderColor: COLOURS.GRAY_500 }
                                    : { borderColor: COLOURS.GRAY_300 }
                            }
                        />
                    </InputContainer>

                    <InRowWrapper>
                        <TimeInputWrapper>
                            <InputContainer size="SMALL">
                                <Label>Data</Label>
                                <InputField
                                    size="SMALL"
                                    keyboardType="numeric"
                                    value={date}
                                    onChangeText={(text) => formatDate(text)}
                                    ref={dateRef}
                                    onFocus={() => setIsDateFocused(true)}
                                    onBlur={() => setIsDateFocused(false)}
                                    style={
                                        isBorderBlack(isDateFocused, date.trim())
                                            ? { borderColor: COLOURS.GRAY_500 }
                                            : { borderColor: COLOURS.GRAY_300 }
                                    }
                                    placeholder="dd/mm/yyyy"
                                    placeholderTextColor={themes.COLOURS.GRAY_500}
                                />
                            </InputContainer>
                        </TimeInputWrapper>

                        <TimeInputWrapper>
                            <InputContainer size="SMALL">
                                <Label>Hora</Label>
                                <InputField
                                    size="SMALL"
                                    keyboardType="numeric"
                                    value={hour}
                                    onChangeText={(text) => formatHour(text)}
                                    ref={hourRef}
                                    onFocus={() => setIsHourFocused(true)}
                                    onBlur={() => setIsHourFocused(false)}
                                    style={
                                        isBorderBlack(isHourFocused, hour.trim())
                                            ? { borderColor: COLOURS.GRAY_500 }
                                            : { borderColor: COLOURS.GRAY_300 }
                                    }
                                    placeholder="hh/mm"
                                    placeholderTextColor={themes.COLOURS.GRAY_500}
                                />
                            </InputContainer>
                        </TimeInputWrapper>
                    </InRowWrapper>

                    <Label>Está dentro da dieta?</Label>
                    <InRowWrapper>
                        <Options
                            onPress={() => handleInDiet()}
                            style={
                                isInDietButtonSelected
                                    ? { backgroundColor: themes.COLOURS.GREEN_LIGHT }
                                    : { backgroundColor: themes.COLOURS.GRAY_500 }
                            }
                        >
                            <Circle type="PRIMARY"></Circle>
                            <Label style={{ marginTop: 5 }}>Sim</Label>
                        </Options>

                        <Options
                            onPress={() => handleNotInDiet()}
                            style={
                                notDietButtonSelected
                                    ? { backgroundColor: themes.COLOURS.RED_LIGHT }
                                    : { backgroundColor: themes.COLOURS.GRAY_500 }
                            }
                        >
                            <Circle type="SECONDARY"></Circle>
                            <Label style={{ marginTop: 5 }}>Não</Label>
                        </Options>
                    </InRowWrapper>
                </View>

                <Button
                    title={mealId ? "Salvar alterações" : "Cadastrar refeição"}
                    onPress={() => submit()}
                />
            </FormContainer>
        </Container>
    );
}
