import React, { useContext } from "react";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import { ThemeContext, ThemeUpdateContext } from "../theme/ThemeProvider";

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1,
    }
}));

const Header = () => {
    const classes = useStyles();
    const darkTheme = useContext(ThemeContext);
    const toggleTheme = useContext(ThemeUpdateContext);

    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Typography variant={"caption"} className={classes.typographyStyles}>
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