import Head from "next/head";
import Content from "../src/components/Content";
import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Header from "../src/components/Header";
import { ROVERS } from "../src/types/constants";
import Footer from "../src/components/Footer";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        containerTypo: {
            width: "80%",
            margin: "1rem 0",
        },
        typographyStyles: {
            letterSpacing: "1.25px",
            [theme.breakpoints.up("lg")]: {
                fontSize: "26px",
            },
        },
    })
);

export default function Home() {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>Next App Example - NASA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <Header/>
                </Grid>
                <div className={classes.containerTypo}>
                    <Typography
                        variant={"h1"}
                        color={"primary"}
                        align={"center"}
                        display={"block"}
                    >
                        Explore Mars
                    </Typography>
                    <Typography
                        variant={"button"}
                        color={"secondary"}
                        gutterBottom
                        align={"center"}
                        display={"block"}
                        className={classes.typographyStyles}
                    >
                        through the eyes of a NASA rover
                    </Typography>
                </div>
                <Grid item container xs={12} justify={"center"}>
                    <Grid item xs={false} sm={false} md={false} lg={1} xl={1}/>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
                        <Content rovers={ROVERS}/>
                    </Grid>
                    <Grid item xs={false} sm={false} md={false} lg={1} xl={1}/>
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </>
    );
}