import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

    margin-top: 40px;
`;

export const Message = styled.Text`
    text-align: center;
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.XL2}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLOURS.GRAY_400};
    `}
`;
