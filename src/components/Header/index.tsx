import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Container, HeaderText, Icon, ViewStyleProps } from "./style";

type Props = {
    text: string;
    type: ViewStyleProps;
};

export function Header({ type, text, ...rest }: Props) {
    const { navigate } = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamsList>>();

    function handleHome() {
        navigate("home");
    }

    return (
        <Container
            type={type}
            {...rest}
        >
            <TouchableOpacity onPress={handleHome}>
                <Icon name="arrow-left" />
            </TouchableOpacity>
            <HeaderText>{text}</HeaderText>
        </Container>
    );
}
