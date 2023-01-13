import { ThemeProvider } from "styled-components/native";

import theme from "@themes/index";

export default function App() {
    return <ThemeProvider theme={theme}></ThemeProvider>;
}
