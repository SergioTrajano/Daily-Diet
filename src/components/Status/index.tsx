import { ViewProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as S from "./style";

type Props = ViewProps & {
    type: S.ButtonStyleTypeProps;
    porcentage: number;
    iconPosition: "RIGHT" | "LEFT";
    icon: keyof typeof Feather.glyphMap;
};

export function Status({ type, porcentage, iconPosition, icon, ...rest }: Props) {
    return (
        <S.Container
            type={type}
            {...rest}
        >
            {iconPosition === "RIGHT" ? (
                <S.IconButtonRight>
                    <S.Icon
                        type={type}
                        name={icon}
                    />
                </S.IconButtonRight>
            ) : (
                <S.IconButtonLeft>
                    <S.Icon
                        type={type}
                        name={icon}
                    />
                </S.IconButtonLeft>
            )}
            <S.PorcentageText>{porcentage}%</S.PorcentageText>
            <S.StatusMessage>das refeições dentro da dieta</S.StatusMessage>
        </S.Container>
    );
}
