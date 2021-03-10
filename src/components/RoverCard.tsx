import React from "react";
import { Card, CardActions, CardContent, CardMedia, Collapse, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "next/link";
import { RoverBaseDetail } from "../types/types";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 350,
            margin: "auto",
            transition: "0.3s",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            backgroundColor: theme.palette.secondary.main,
            "&:hover": {
                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
            }
        },
        cardMedia: {
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
        },
        media: {
            width: "100%",
            height: "auto",
            maxWidth: "100vw",
        },
        content: {
            display: "flex",
            flexDirection: "column",
            textAlign: "justify",
            padding: 0,
            "&:last-child": {
                paddingBottom: 5,
            },
        },
        heading: {
            fontWeight: "bold",
            color: theme.palette.background.default,
        },
        subheading: {
            lineHeight: 1.8,
            color: theme.palette.background.default,
        },
        grid: {
            justifyContent: "space-between",alignItems: "flex-end",
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
            padding: 5,
        },
        expandOpen: {
            transform: "rotate(180deg)",
            padding: 5,
        },
    }),
);

type RoverCardProps = {
    rover: RoverBaseDetail
}

const RoverCard = ({ rover }: RoverCardProps): JSX.Element => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.card} raised>
            {rover.name !== "next"
                ? <Link href={`/rovers/${rover.id}`} as={`/rovers/${rover.name}`}>
                    <CardMedia className={classes.cardMedia}>
                        <img
                            src={`/images/rovers/${rover.name}.jpg`}
                            className={classes.media}
                            alt={rover.name}
                        />
                    </CardMedia>
                </Link>
                :
                <Link href={"http://www.mars-one.com/"}>
                    <CardMedia className={classes.cardMedia}>
                        <img
                            src={`/images/rovers/${rover.name}.jpg`}
                            className={classes.media}
                            alt={rover.name}
                        />
                    </CardMedia>
                </Link>
            }
            <CardContent className={classes.content}>
                <CardActions disableSpacing>
                    <Typography
                        className={classes.heading}
                        variant={"h6"}
                    >
                        {rover.name.toUpperCase()}
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography
                            className={classes.subheading}
                            variant={"body1"}
                        >
                            {rover.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardContent>
        </Card>
        
    );
};

export default RoverCard;