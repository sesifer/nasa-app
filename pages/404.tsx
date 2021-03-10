import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CssBaseline, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    block404: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        width: "auto",
        margin: 20,
        "& a": {
            textDecoration: "none",
        }
    },
    title: {
        margin: "1em",
    },
}));

const NotFound = () => {
    const classes = useStyles();
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 3000);
    }, []);

    return (
        <div className={classes.block404}>
            <CssBaseline />
            <Typography variant={"h1"} className={classes.title}>Ooops...</Typography>
            <Typography variant={"subtitle1"}>That page cannot be found :(</Typography>
            <Typography variant={"subtitle2"}>Going back to the
                <Link href="/"><a> Homepage </a></Link> in 3 seconds...
            </Typography>
        </div>
    );
};

export default NotFound;