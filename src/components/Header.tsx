import React, { useContext } from "react";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import Link from "next/link";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import { ThemeContext, ThemeUpdateContext } from "../theme/ThemeProvider";
import { createStyles, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) =>
    createStyles({
        typographyStyles: {
            flex: 1,
            letterSpacing: "1.25px",
            [theme.breakpoints.down("xs")]: {
                fontWeight: 400, fontSize: "10px",
            },
            [theme.breakpoints.down("md")]: {
                fontWeight: 500, fontSize: "16px",
            },
        }
    })
);

const Header = () => {
    const classes = useStyles();
    const darkTheme = useContext(ThemeContext);
    const toggleTheme = useContext(ThemeUpdateContext);

    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Typography variant={"subtitle2"} className={classes.typographyStyles}>
                    Meanwhile, on the Red planet..
                </Typography>
                <Link href="/">
                    <Tooltip title="Return to the home page">
                        <IconButton>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Tooltip title="Toggle Theme">
                    <Button variant="text" color="inherit" onClick={toggleTheme}>
                        {darkTheme ? <WbSunnyIcon /> : <Brightness3Icon />}
                    </Button>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Header;