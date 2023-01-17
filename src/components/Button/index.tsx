import { Container, ButtonText, ButtonTypeStyleProps, Icon } from "./style";
import { Feather } from "@expo/vector-icons";

import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
    icon?: keyof typeof Feather.glyphMap;
    type?: ButtonTypeStyleProps;
};

export function Button({ title, type = "PRIMARRY", icon, ...rest }: Props) {
    return (
        <Container
            type={type}
            {...rest}
        >
            <Icon
                name={icon}
                type={type}
            />
            <ButtonText type={type}>{title}</ButtonText>
        </Container>
    );
}
