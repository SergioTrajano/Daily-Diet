import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

type StatsTypeColor = "PRIMARY" | "SECONDARY" | "DEFAULT";
type StatsSize = "SMALL" | "LARGE";

type StatsProps = {
    Size: StatsSize;
    type: StatsTypeColor;
};

type ContainerProps = {
    type: StatsTypeColor;
};

export const Container = styled(SafeAreaView)<ContainerProps>`
    flex: 1;

    background-color: ${({ theme, type }) =>
        type === "PRIMARY" ? theme.COLOURS.GREEN_LIGHT : theme.COLOURS.RED_LIGHT};
`;

export const StatisticsContainer = styled.View`
    width: 100%;
    flex: 1;

    align-items: center;

    background-color: ${({ theme }) => theme.COLOURS.WHITE};

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    margin-top: 20px;
    padding: 40px 24px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
        line-height: ${theme.LINE_HEIGHT.SM}px;
        color: ${theme.COLOURS.GRAY_100};
    `}

    margin-bottom: 23px;
`;

export const Stats = styled(View)<StatsProps>`
    width: ${({ Size }) => (Size === "LARGE" ? "100%" : "48%")};
    min-height: ${({ Size }) => (Size === "LARGE" ? "89px" : "107px")};
    max-height: ${({ Size }) => (Size === "LARGE" ? "89px" : "107px")};

    justify-content: center;
    align-items: center;

    background-color: ${({ type, theme }) => {
        if (type === "PRIMARY") {
            return theme.COLOURS.GREEN_LIGHT;
        }
        if (type === "SECONDARY") {
            return theme.COLOURS.RED_LIGHT;
        }

        return theme.COLOURS.GRAY_600;
    }};

    border-radius: 8px;

    margin-bottom: 12px;
    padding: 16px;
`;

export const StrongText = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.XL}px;
        line-height: ${theme.LINE_HEIGHT.XL}px;
        color: ${theme.COLOURS.GRAY_100};
    `}

    margin-bottom: 8px;

    text-align: center;
`;

export const Regulartext = styled.Text`
    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.SM}px;
        line-height: ${theme.LINE_HEIGHT.SM}px;
        color: ${theme.COLOURS.GRAY_200};
    `}

    text-align: center;
`;

export const SmallStatsContainer = styled.View`
    width: 100%;
    min-height: 107px;
    max-height: 107px;

    flex-direction: row;

    justify-content: space-between;
`;
