import "../styles/globals.scss";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { SWRConfig } from "swr";
import { ThemeProvider } from "@material-ui/styles";
import lightTheme from "../src/theme/theme";
import styles from "./../styles/App.module.scss";

function MyApp({ Component, pageProps } : AppProps) {
    const [style, setStyle] = useState<React.CSSProperties>({ visibility: "hidden" });
    useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        jssStyles?.parentElement.removeChild(jssStyles);
        setStyle({});
    }, []);
    
    return (
        <>
            <div className={styles["appContainer"]} style={style}>
                <ThemeProvider theme={lightTheme}>
                    <SWRConfig
                        value={{
                            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
                        }}
                    >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div className={styles["contentContainer"]}>
                                <Component {...pageProps} />
                            </div>
                        </MuiPickersUtilsProvider>
                    </SWRConfig>
                </ThemeProvider>
            </div>
        </>
    );
}

export default MyApp;
