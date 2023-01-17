import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import { Text } from "react-native";

type PageProps = "PRIMARY" | "SECONDARY";

type Props = {
    type: PageProps;
};

export const Container = styled(SafeAreaView)`
    width: 100%;
    flex: 1;

    background-color: ${({ theme }) => theme.COLOURS.WHITE};

    align-items: center;
    padding: 160px 32px 0;
`;

export const Title = styled(Text)<Props>`
    ${({ theme, type }) => css`
        font-size: ${theme.FONT_SIZE.XL}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${type === "PRIMARY" ? theme.COLOURS.GREEN_DARK : theme.COLOURS.RED_DARK};
        line-height: ${theme.LINE_HEIGHT.XL}px;
    `}

    margin-bottom: 8px;
`;

export const Message = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLOURS.GRAY_100};
        line-height: ${theme.LINE_HEIGHT.MD}px;
    `}

    text-align: center;

    margin-bottom: 40px;
`;

export const BoldMessage = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLOURS.GRAY_100};
        line-height: ${theme.LINE_HEIGHT.MD}px;
    `}
`;

export const Image = styled.Image`
    width: 224px;
    height: 288px;
`;

export const ButtonWrapper = styled.View`
    width: 191px;
    height: 50px;

    margin-top: 32px;
`;
