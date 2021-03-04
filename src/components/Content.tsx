import React from "react";
import { Grid } from "@material-ui/core";
import RoverCard from "./RoverCard";
import { RoverBaseDetail } from "../types/types";

type ContextProps = {
    rovers: Array<RoverBaseDetail>,
}

const  Content = ({rovers}: ContextProps): JSX.Element => {
    return (
        <Grid container item spacing={4}>
            {rovers.map((rover) =>
                <Grid key={`grid-${rover.name}`} item xs={12} sm={12} md={6} xl={4}>
                    <RoverCard rover={rover} />
                </Grid>
            )}
        </Grid>
    );
};

export default Content;