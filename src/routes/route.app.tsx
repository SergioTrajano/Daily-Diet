import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { Meal } from "@screens/Meal";
import { MotivationalMessage } from "@screens/MotivationalMessage";
import { NewMeal } from "@screens/NewMeal";
import { Statistics } from "@screens/Statistics";

const { Navigator, Screen } = createNativeStackNavigator<ReactNavigation.RootParamsList>();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="home"
                component={Home}
            />
            <Screen
                name="newMeal"
                component={NewMeal}
            />
            <Screen
                name="motivationalMessage"
                component={MotivationalMessage}
            />
            <Screen
                name="meal"
                component={Meal}
            />
            <Screen
                name="statistics"
                component={Statistics}
            />
        </Navigator>
    );
}
