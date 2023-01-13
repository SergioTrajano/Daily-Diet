import { TouchableOpacity, View } from "react-native";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export type ButtonStyleTypeProps = "PRIMARY" | "SECONDARY";

type Props = {
    type: ButtonStyleTypeProps;
};

export const Container = styled(View)<Props>`
    flex: 1;
    min-height: 102px;
    max-height: 102px;

    background-color: ${({ theme, type }) =>
        type === "PRIMARY" ? theme.COLOURS.GREEN_LIGHT : theme.COLOURS.RED_LIGHT};

    border-radius: 8px;
    padding: 20px 16px;
    justify-content: center;
    align-items: center;

    position: relative;
`;

export const PorcentageText = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.XL2}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLOURS.GRAY_100};
        line-height: ${theme.LINE_HEIGHT.XL2}px;
    `}
`;

export const StatusMessage = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.LG}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLOURS.GRAY_200};
        line-height: ${theme.LINE_HEIGHT.LG}px;
    `}
`;

export const IconButtonRight = styled(TouchableOpacity)`
    position: absolute;
    top: 10px;
    right: 7px;
`;

export const IconButtonLeft = styled(TouchableOpacity)`
    position: absolute;
    top: 3px;
    left: 3px;
`;

export const Icon = styled(Feather).attrs<Props>(({ theme, type }) => ({
    color: type === "PRIMARY" ? theme.COLOURS.GREEN_DARK : theme.COLOURS.RED_DARK,
    size: 24,
}))<Props>``;
