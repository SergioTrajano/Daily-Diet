import styled, { css } from "styled-components/native";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

export type ViewStyleProps = "PRIMARY" | "SECONDARY" | "TERTIARY";

type Props = {
    type: ViewStyleProps;
};

export const Container = styled(View)<Props>`
    width: 100%;
    height: 76px;

    flex-direction: row;
    align-items: center;

    background-color: ${({ theme, type }) => {
        if (type === "PRIMARY") {
            return theme.COLOURS.GREEN_LIGHT;
        }
        if (type === "SECONDARY") {
            return theme.COLOURS.RED_LIGHT;
        }

        return theme.COLOURS.GRAY_500;
    }};

    padding-left: 24px;
    padding-right: 48px;
`;

export const HeaderText = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        line-height: ${theme.LINE_HEIGHT.MD}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLOURS.GRAY_100};
    `}

    flex: 1;
    text-align: center;
`;

export const Icon = styled(Feather).attrs(({ theme }) => ({
    size: 24,
    color: theme.COLOURS.GRAY_200,
}))``;
