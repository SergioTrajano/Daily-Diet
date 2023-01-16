import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Container, HeaderText, Icon, ViewStyleProps } from "./style";

type Props = {
    onClick: () => void;
    icon: keyof typeof Feather.glyphMap;
    text: string;
    type: ViewStyleProps;
};

export function Header({ type, icon, text, onClick, ...rest }: Props) {
    return (
        <Container
            type={type}
            {...rest}
        >
            <TouchableOpacity onPress={() => onClick()}>
                <Icon name={icon} />
            </TouchableOpacity>
            <HeaderText>{text}</HeaderText>
        </Container>
    );
}
