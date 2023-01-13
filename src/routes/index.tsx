import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./route.app";

export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    );
}
