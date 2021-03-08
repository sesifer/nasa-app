import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
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
        <div className={classes.root}>
            <CssBaseline />
            <Typography variant={"h1"}>Ooops...</Typography>
            <Typography variant={"subtitle1"}>That page cannot be found :(</Typography>
            <Typography variant={"subtitle2"}>Going back to the
                <Link href="/"><a> Homepage </a></Link> in 3 seconds...
            </Typography>
        </div>
    );
};

export default NotFound;