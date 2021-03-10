import React from "react";
import { Button } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles(() =>
    createStyles({
        button404: {
            position: "absolute",
            bottom: 0,
            right: 0,
            color: grey[300],
        },
        footer: {
            position: "absolute",
            bottom: 0,
            height: 140,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        a: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            color: grey[900],
            "&:hover&:focus&:active": {
                textDecoration: "underline",
            }
        },
        img: {
            marginLeft: "0.5rem",
            height: "1em",
        },
    })
);

const Footer = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.a}
                >
            Powered by{" "}
                    <img src="/vercel.svg" alt="Vercel Logo" className={classes.img}/>
                </a>
            </div>
            <Button
                href="/404"
                className={classes.button404}
            >
                 Check out 404 page
            </Button>
        </>
    );
};

export default Footer;