import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { SWRConfig } from "swr";
import { ThemeProvider } from "./../src/theme/ThemeProvider";
import styles from "./../styles/App.module.scss";
import CssBaseline from "@material-ui/core/CssBaseline";

function MyApp({ Component, pageProps } : AppProps) {
    const [style, setStyle] = useState<React.CSSProperties>({ visibility: "hidden" });
    useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        jssStyles?.parentElement?.removeChild(jssStyles);
        setStyle({});
    }, []);

    
    return (
        <>
            <CssBaseline />
            <div className={styles["app-container"]} style={style}>
                <ThemeProvider>
                    <SWRConfig
                        value={{
                            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
                        }}
                    >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div className={styles["content-container"]}>
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
