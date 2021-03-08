import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { lightTheme, darkTheme } from "./theme";

export const ThemeContext = React.createContext(false);
export const ThemeUpdateContext = React.createContext(() => console.log());

interface ThemeProviderProps {
    children: React.ReactNode,
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
    const [isDarkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme && theme === "darkTheme") {
            setDarkTheme(true);
        }
    }, []);

    function toggleTheme() {
        setDarkTheme(!isDarkTheme);
        localStorage.setItem("theme", isDarkTheme ? "darkTheme" : "lightTheme");
    }

    return (
        <ThemeContext.Provider value={isDarkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                <MuiThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                    {children}
                </MuiThemeProvider>
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
};