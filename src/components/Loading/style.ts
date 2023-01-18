import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    left: 0;

    background-color: ${({ theme }) => theme.COLOURS.WHITE};
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
    color: theme.COLOURS.GRAY_200,
    size: "large",
}))``;
