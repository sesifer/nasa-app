import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Content from "../src/components/Content";
import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import Header from "../src/components/Header";
import { ROVERS } from "../src/types/constants";

export default function Home() {
    return (
        <>
            <Head>
                <title>Next App Example - NASA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid container direction={"column"}>
                <Grid item>
                    <Header />
                </Grid>
                <Grid item container>
                    <Grid item xs={1} sm={2} />
                    <Box p={5}>
                        <Typography
                            variant={"h1"}
                            align={"center"}
                            color={"primary"}
                            gutterBottom={true}
                        >
                    Explore Mars by the eyes of a NASA rover
                        </Typography>
                    </Box>
                    <Grid item xs={10} sm={8}>
                        <Content rovers={ROVERS}/>
                    </Grid>
                    <Grid item xs={1} sm={2} />
                </Grid>
            </Grid>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </>
    );
}