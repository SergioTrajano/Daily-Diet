import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

type StatusStyleProps = "PRIMARY" | "SECONDARY";

type StatusProps = {
    type: StatusStyleProps;
};

export const Container = styled(SafeAreaView)`
    width: 100%;
    flex: 1;
    background-color: ${({ theme }) => theme.COLOURS.GREEN_LIGHT};
`;

export const MealDataContainer = styled.View`
    width: 100%;
    flex: 1;

    justify-content: space-between;

    background-color: ${({ theme }) => theme.COLOURS.WHITE};

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 40px 24px;
`;

export const Wrapper = styled.View`
    margin-bottom: 24px;
`;

export const MealName = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLOURS.GRAY_100};
    `}

    font-size: 20px;
    line-height: 26px;
    margin-bottom: 8px;
`;

export const MealInfo = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        line-height: ${theme.LINE_HEIGHT.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLOURS.GRAY_200};
    `}
`;

export const Text = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        line-height: ${theme.LINE_HEIGHT.MD}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLOURS.GRAY_100};
    `}

    margin-bottom: 8px;
`;

export const StatusContainer = styled(View)<StatusProps>`
    flex-direction: row;

    width: ${({ type }) => (type === "PRIMARY" ? "147px" : "127px")};
    height: 38px;

    justify-content: center;
    align-items: center;

    padding: 8px 16px;

    border-radius: 17px;

    background-color: ${({ theme }) => theme.COLOURS.GRAY_600};
`;

export const CircleStatus = styled(View)<StatusProps>`
    width: 8px;
    height: 8px;

    border-radius: 4px;
    margin-right: 8px;

    background-color: ${({ theme, type }) =>
        type === "PRIMARY" ? theme.COLOURS.GREEN_DARK : theme.COLOURS.RED_DARK};
`;

export const StatusText = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        line-height: ${theme.LINE_HEIGHT.SM}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLOURS.GRAY_100};
    `}
`;

export const ButtonsContainer = styled.View`
    height: 110px;

    justify-content: space-between;
`;

export const ModalContainer = styled.View`
    width: 100%;
    height: 100%;

    z-index: 1;

    position: absolute;
    top: 0;
    left: 0;

    justify-content: center;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.1);
`;

export const Modal = styled.View`
    width: 327px;
    height: 192px;

    border-radius: 8px;
    padding: 20px;
    justify-content: space-between;

    background-color: ${({ theme }) => theme.COLOURS.GRAY_700};
`;

export const ModalText = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.LG}px;
        line-height: ${theme.LINE_HEIGHT.LG}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLOURS.GRAY_200};
    `}

    text-align: center;
`;

export const ModalButtonsContainer = styled.View`
    width: 287px;
    height: 50px;

    flex-direction: row;

    justify-content: space-between;
`;

export const ButtonWrapper = styled.View`
    width: 135px;
    height: 50px;
`;
