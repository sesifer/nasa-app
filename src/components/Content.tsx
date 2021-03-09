import React from "react";
import { Grid } from "@material-ui/core";
import RoverCard from "./RoverCard";
import { RoverBaseDetail } from "../types/types";

type ContextProps = {
    rovers: Array<RoverBaseDetail>,
}

const  Content = ({rovers}: ContextProps): JSX.Element => {
    return (
        <Grid container item spacing={2} justify={"center"}>
            {rovers.map((rover) =>
                <Grid key={`grid-${rover.name}`} item xs={12} sm={6} md={4} lg={2} xl={1}>
                    <RoverCard rover={rover} />
                </Grid>
            )}
        </Grid>
    );
};

export default Content;