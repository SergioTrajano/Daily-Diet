import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TextInput, TouchableOpacity } from "react-native";

type InputStyleProps = "SMALL" | "LARGE";
type CircleStyleProp = "PRIMARY" | "SECONDARY";

type Props = {
    size: InputStyleProps;
};

type CircleProps = {
    type: CircleStyleProp;
};

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.COLOURS.GRAY_500};
`;

export const FormContainer = styled.View`
    width: 100%;
    flex: 1;

    justify-content: space-between;

    background-color: ${({ theme }) => theme.COLOURS.WHITE};

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 40px 24px;
`;

export const InRowWrapper = styled.View`
    flex-direction: row;
    flex: 1;
    justify-content: space-between;

    min-height: 70px;
    max-height: 70px;

    margin-bottom: 24px;
`;

export const TimeInputWrapper = styled.View`
    width: 46.94%;
    min-height: 70px;
    max-height: 70px;
`;

export const InputContainer = styled(View)<Props>`
    flex: 1;
    margin-bottom: 24px;
    min-height: ${({ size }) => (size === "SMALL" ? "70px" : "142px")};
    max-height: ${({ size }) => (size === "SMALL" ? "70px" : "142px")};
`;

export const Label = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLOURS.GRAY_200};
        line-height: ${theme.LINE_HEIGHT.SM}px;
    `}

    margin-bottom: 4px;
`;

export const InputField = styled(TextInput)<Props>`
    flex: 1;

    padding: 7px 14px;

    border-radius: 6px;

    ${({ theme, size }) => css`
        height: ${size === "SMALL" ? "48px" : "120px"}

        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLOURS.GRAY_200};
        line-height: ${theme.LINE_HEIGHT.MD}px;

        border: 1px solid ${theme.COLOURS.GRAY_500};
    `}
`;

export const Options = styled(TouchableOpacity)`
    width: 46.94%;
    min-height: 50px;
    max-height: 50px;

    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.COLOURS.GRAY_600};

    flex-direction: row;

    border-radius: 6px;
`;

export const Circle = styled.View<CircleProps>`
    width: 8px;
    height: 8px;

    border-radius: 4px;

    margin-right: 8px;

    background-color: ${({ theme, type }) =>
        type === "PRIMARY" ? theme.COLOURS.GREEN_DARK : theme.COLOURS.RED_DARK};
`;
