import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { makeStyles } from "@material-ui/styles";

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
                <IconButton>
                    <WbSunnyIcon />
                </IconButton>
                {/*<Brightness3Icon />*/}
            </Toolbar>
        </AppBar>
    );
};

export default Header;