import { Text, View } from "react-native";
import styled, { css } from "styled-components/native";

type Props = {
    isInDiet: boolean;
};

export const Container = styled.View`
    flex: 1;

    margin-top: 32px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.LG}px;
        color: ${theme.COLOURS.GRAY_100};
        line-height: ${theme.LINE_HEIGHT.LG}px;
    `}
`;

export const MealInfoWrapper = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    min-height: 49px;
    max-height: 49px;

    background-color: ${({ theme }) => theme.COLOURS.GRAY_600};

    border-radius: 6px;
    padding: 0 12px;
    margin-top: 8px;

    align-items: center;
    justify-content: space-evenly;
`;

export const HourText = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.XS}px;
        color: ${theme.COLOURS.GRAY_100};
        line-height: ${theme.LINE_HEIGHT.XS}px;
    `}
`;

export const TextDivider = styled.View`
    width: 1px;
    height: 17.5px;
    background-color: ${({ theme }) => theme.COLOURS.GRAY_400};
`;

export const MealText = styled(Text).attrs(() => ({
    ellipsizeMode: "tail",
    numberOfLines: 1,
}))`
    width: 217px;

    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.XS}px;
        color: ${theme.COLOURS.GRAY_100};
        line-height: ${theme.LINE_HEIGHT.XS}px;
    `};
`;

export const Circle = styled(View)<Props>`
    width: 14px;
    height: 14px;

    background-color: ${({ theme, isInDiet }) =>
        isInDiet ? theme.COLOURS.GREEN_MID : theme.COLOURS.RED_MID};

    border-radius: 7px;
`;
