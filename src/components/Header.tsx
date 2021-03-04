import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { makeStyles } from "@material-ui/styles";
import HomeIcon from "@material-ui/icons/Home";
import Link from "next/link";

const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

const Header = () => {
    const classes = useStyles();
    
    return (
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Typography className={classes.typographyStyles}>
                    Meanwhile, on the Red planet..
                </Typography>
                <Link href="/">
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <IconButton>
                    <WbSunnyIcon />
                </IconButton>
                {/*<Brightness3Icon />*/}
            </Toolbar>
        </AppBar>
    );
};

export default Header;