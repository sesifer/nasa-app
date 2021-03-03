import React from "react";
import { Grid, Link } from "@material-ui/core";
import RoverCard from "./RoverCard";
import { RoverBaseDetail } from "../types/types";

type ContextProps = {
    rovers: Array<RoverBaseDetail>,
}

const  Content = ({rovers}: ContextProps): JSX.Element => {
    return (
        <Grid container spacing={2}>
            {rovers.map((rover) =>
                <Grid key={`grid-${rover.name}`} item xs={12} sm={6}>
                    <RoverCard rover={rover} />
                </Grid>
            )}
        </Grid>
    );
};

export default Content;