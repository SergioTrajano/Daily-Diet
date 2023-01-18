import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.COLOURS.GRAY_700};
    padding: 30px 24px;
`;

export const NewMeal = styled.View`
    margin-top: 40px;
`;

export const NewMealText = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLOURS.GRAY_100};
        line-height: ${theme.LINE_HEIGHT.MD}px;
    `}

    margin-bottom: 8px;
`;

export const Image = styled.Image`
    width: 100px;
    height: 45.12px;

    align-self: center;

    margin-bottom: 33px;
`;
