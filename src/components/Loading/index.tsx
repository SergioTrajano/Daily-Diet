import { ViewProps } from "react-native";
import { Container, LoadIndicator } from "./style";

type Props = ViewProps;

export function Loading({ ...rest }: Props) {
    return (
        <Container {...rest}>
            <LoadIndicator />
        </Container>
    );
}
