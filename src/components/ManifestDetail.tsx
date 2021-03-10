import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles(theme =>
    createStyles({
        card: {
            display: "block",
            [theme.breakpoints.down("xs")]: {
                width: "95%",
            },
            [theme.breakpoints.down("sm")]: {
                width: "100%",
            },
            margin: "auto",
            borderRadius: 0,
            transition: "0.3s",
            boxShadow: "none",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.secondary,

            "&:hover": {
                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
            },
        },
        cardMedia: {
            display: "flex",
            justifyContent: "center",
        },
        table: {
            width: "100%",
            fontSize: 24,
            margin: "auto",
        },
        details: {
            paddingBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        media: {
            width: "100%",
            height: "auto",
        },
    }),
);

interface ManifestProps {
    name: string;
    landingDate: string;
    launchDate: string;
    photosTaken: number;
    status: string;
}

const ManifestDetail = (props: ManifestProps) => {
    const { landingDate, launchDate, name, status, photosTaken } = props;
    const classes = useStyles();

    return (
        <Card className={classes.card} raised>
            <CardMedia className={classes.cardMedia}>
                <img
                    src={`/images/rovers/${name.toLowerCase()}.jpg`}
                    className={classes.media}
                    alt={name}
                />
            </CardMedia>
            <div className={classes.details}>
                <CardContent>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell>{name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Status</TableCell>
                                <TableCell>{status}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Landing Date</TableCell>
                                <TableCell>{landingDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Launch Date</TableCell>
                                <TableCell>{launchDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row"> Photos taken</TableCell>
                                <TableCell>{photosTaken}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </div>
        </Card>
    );
};

export default ManifestDetail;