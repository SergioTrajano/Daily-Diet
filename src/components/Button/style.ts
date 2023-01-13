import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "PRIMARRY" | "SECONDARY";

type Props = {
    type: ButtonTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;
    min-height: 50px;
    max-height: 50px;

    background-color: ${({ theme }) => theme.COLOURS.GRAY_200};
    border-radius: 6px;

    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLOURS.WHITE};
    `}
`;

export const Icon = styled(Feather).attrs<Props>(({ theme, type }) => ({
    size: 18,
    color: type === "PRIMARRY" ? theme.COLOURS.WHITE : theme.COLOURS.GRAY_100,
}))`
    margin-right: 12px;
`;
