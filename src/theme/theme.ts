import {createMuiTheme, Theme, ThemeOptions} from "@material-ui/core/styles";

export const paletteColorsDark = {
    primary: "rgb(234, 103, 73)",
    secondary: "rgb(66, 81, 100)",
    error: "#ED6560",
    background: "rgb(243, 244, 248)",
    text: "rgb(66, 81, 100)",
};

export const paletteColorsLight = {
    primary: "rgb(79, 156, 251)",
    secondary: "rgb(246, 184, 83)",
    error: "#ED6560",
    background: "rgb(66, 81, 100)",
    text: "rgb(255, 255, 255)",
};

const options = (dark: boolean): ThemeOptions => {
    const paletteColors = dark ? paletteColorsDark : paletteColorsLight;
    return {
        palette: {
            type: dark ? "dark" : "light",
            primary: {
                main: paletteColors.primary,
            },
            secondary: {
                main: paletteColors.secondary,
            },
            error: {
                main: paletteColors.error,
            },
            background: {
                default: paletteColors.background,
            },
            text: {
                primary: paletteColors.text,
            },
        },
        typography: {
            fontFamily: "'Open Sans', sans-serif",
            h1: {
                fontFamily: "'Geostar', cursive",
                fontWeight: 300,
                fontSize: "96px",
                lineHeight: "127px",
                letterSpacing: "-1.5px",
            },
            h2: { fontFamily: "'Open Sans', sans-serif", fontWeight: 300, fontSize: "60px", lineHeight: "79px", letterSpacing: "-0.5px" },
            h3: { fontFamily: "'Open Sans', sans-serif", fontSize: "48px", lineHeight: "63px" },
            h4: { fontFamily: "'Open Sans', sans-serif", fontSize: "34px", lineHeight: "45px", letterSpacing: "0.25px" },
            h5: { fontFamily: "'Open Sans', sans-serif", fontSize: "24px", lineHeight: "32px" },
            h6: { fontFamily: "'Open Sans', sans-serif", fontWeight: 500, fontSize: "20px", lineHeight: "26px", letterSpacing: "0.15px" },
            subtitle1: { fontFamily: "'Open Sans', sans-serif", fontSize: "16px", lineHeight: "19px", letterSpacing: "0.15px" },
            subtitle2: {
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "16.41px",
                letterSpacing: "0.1px",
            },
            body1: { fontFamily: "'Open Sans', sans-serif", fontSize: "18px", lineHeight: "200%", letterSpacing: "0.5px" },
            body2: { fontFamily: "'Open Sans', sans-serif", fontSize: "14px", lineHeight: "16px", letterSpacing: "0.25px" },
            button: { fontFamily: "'Open Sans', sans-serif", fontWeight: 500, fontSize: "14px", letterSpacing: "1.25px" },
            caption: { fontFamily: "'Open Sans', sans-serif", fontSize: "12px", lineHeight: "14px", letterSpacing: "0.4px" },
            overline: { fontFamily: "'Open Sans', sans-serif", fontSize: "10px", lineHeight: "12px", letterSpacing: "1.5px" },
        },
        overrides: {
            MuiCssBaseline: {
                "@global": {
                    html: {
                        height: "100%",
                        padding: 0,
                        margin: 0,
                        width: "100vw",
                    },
                    body: {
                        height: "100%",
                        padding: 0,
                        margin: 0,
                        width: "100vw",
                        overflowX: "hidden",
                    },
                    a: {
                        textDecoration: "none",
                        fontWeight: 900,
                        color: paletteColors.text,
                    },
                },
            },
            MuiSelect: {
                select: {
                    "&:focus": {
                        backgroundColor: paletteColors.background,
                    }
                }
            }
        }
    };
};

export const darkTheme: Theme = createMuiTheme(options(true));
export const lightTheme: Theme = createMuiTheme(options(false));

export default lightTheme;
