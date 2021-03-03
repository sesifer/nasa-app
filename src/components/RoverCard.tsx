import React from "react";
import { Card, CardActions, CardHeader, CardMedia, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { createStyles, makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { RoverBaseDetail } from "../types/types";

const useStyles = makeStyles(() =>
    createStyles({
        media: {
            height: 350,
            width: 350,
            //paddingTop: "56.25%", // 16:9
        },
        card: {
            cursor: "pointer",
        }
    }),
);

type RoverCardProps = {
    rover: RoverBaseDetail
}

const RoverCard = ({ rover }: RoverCardProps): JSX.Element => {
    const classes = useStyles();

    return (
        <Link href={`/rovers/${rover.id}`} as={`/rovers/${rover.name}`}>
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    }
                    title={rover.name.toUpperCase()}
                />
                <CardMedia
                    className={classes.media}
                    image={`/images/rovers/${rover.name}.jpg`}
                    title={rover.name}
                />
                <CardActions disableSpacing>
                    <Button size="small" color="primary">
                    Share
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
};

export default RoverCard;