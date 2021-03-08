import Head from "next/head";
import Content from "../src/components/Content";
import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import Header from "../src/components/Header";
import { ROVERS } from "../src/types/constants";
import Footer from "../src/components/Footer";

export default function Home() {
    return (
        <>
            <Head>
                <title>Next App Example - NASA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box style={{display: "flex", flexDirection: "column", alignItems: "strech"}}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
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
                <Grid item container xs={12} justify={"center"}>
                    <Grid item xs={false} sm={false} md={false} lg={1} xl={2}/>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                        <Content rovers={ROVERS}/>
                    </Grid>
                    <Grid item xs={false} sm={false} md={false} lg={1} xl={2}/>
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Box>
        </>
    );
}