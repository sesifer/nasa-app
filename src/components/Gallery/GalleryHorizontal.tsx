import { Button, GridList, GridListTile, Typography } from "@material-ui/core";
import { format } from "date-fns";
import { API_KEY, DEFAULT_ENDPOINT } from "../../types/constants";
import { GalleryItem } from "../../types/types";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { usePaginatePhotos } from "../../../useRequest";
import theme from "../../theme/theme";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            // width: 500,
            // height: 450,
        },
        galleryButtons: {
            display: "flex",
            justifyContent: "center"
        },
        button: {
            margin: "2em",
        }
    })
);

interface GalleryProps {
    camera: string;
    selectedDate: Date;
    roverId: string;
}

const GalleryHorizontal = (props: GalleryProps): JSX.Element => {
    const classes = useStyles();
    const small = theme.breakpoints.down("sm");

    let url = `${DEFAULT_ENDPOINT}rovers/${props.roverId}/photos?api_key=${API_KEY}`;
    if (props.camera === "") {
        url = `${url}&sol=1&page=1`;
    } else {
        const selectedDateStr = format(props.selectedDate, "yyyy-MM-dd");
        url = `${url}&earth_date=${selectedDateStr}&camera=${props.camera}`;
    }

    const {
        photos,
        error,
        isLoadingMore,
        size,
        setSize,
        isReachingEnd,
        isEmpty,
    } = usePaginatePhotos(url);

    if (error) return <h1>Something went wrong!</h1>;
    if (!photos) return <h1>Loading...</h1>;

    const flattenPhotosArray: Array<GalleryItem> = [];

    photos.map((item: Record<any, any>) => {
        item.photos.map((subItem: GalleryItem) => {
            flattenPhotosArray.push(subItem);
        });
    });

    return (
        <div className={classes.root}>
            <GridList
                cellHeight={"auto"}
                className={classes.gridList}
                cols={small ? 1 : 2}>
                {isEmpty ? <Typography>Yay, no issues found.</Typography> : null}
                {flattenPhotosArray.map((photo: GalleryItem) => {
                    return <GridListTile key={photo.id} cols={1}>
                        <img src={photo.img_src} alt="" />
                    </GridListTile>;
                })}
            </GridList>
            <div className={classes.galleryButtons}>
                <Button
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                    color="secondary"
                    variant="outlined"
                    className={classes.button}
                >
                    {isLoadingMore
                        ? "Loading..."
                        : isReachingEnd
                            ? "No more photos"
                            : "Load more"}
                </Button>
                <Button
                    disabled={!size}
                    onClick={() => setSize(0)}
                    color="secondary"
                    variant="outlined"
                    className={classes.button}
                >
                Clear
                </Button>
            </div>
        </div>
    );
};

export default GalleryHorizontal;