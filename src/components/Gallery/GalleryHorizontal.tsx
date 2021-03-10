import { Button, GridList, GridListTile, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { format, isValid } from "date-fns";
import { API_KEY, DEFAULT_ENDPOINT } from "../../types/constants";
import { GalleryItem } from "../../types/types";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { usePaginatePhotos } from "../../../useRequest";
import ImageComponent from "../ImageComponent";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: theme.palette.background.paper,
            padding: "1em",
        },
        gridList: {
            width: "100%",
            textAlign: "center",
        },
        media: {
            width: "100%",
            height: "auto",
            maxWidth: "25vw",
        },
        galleryButtons: {
            display: "flex",
            justifyContent: "center"
        },
        button: {
            margin: "2em",
        },
        yay: {
            width: "100%",
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
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesSmLg = useMediaQuery(theme.breakpoints.between("sm", "md"));

    let url = `${DEFAULT_ENDPOINT}rovers/${props.roverId}/photos?api_key=${API_KEY}`;
    if (props.camera === "") {
        url = `${url}&sol=1&page=1`;
    } else {
        const isDateValid = isValid(new Date(props.selectedDate));
        if (isDateValid) {
            const selectedDateStr = format(props.selectedDate, "yyyy-MM-dd");
            url = `${url}&earth_date=${selectedDateStr}&camera=${props.camera}`;
        }
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
                cols={matchesXs ? 3 : (matchesSmLg ? 4 : 5)}
            >
                {isEmpty
                    ? <Typography variant={"body1"} className={classes.yay}>
                            Yay, no photos found!
                    </Typography>
                    : null
                }
                {flattenPhotosArray.map((photo: GalleryItem) => {
                    return (
                        <GridListTile key={photo.id} cols={1}>
                            <ImageComponent src={photo.img_src} />
                        </GridListTile>
                    );
                })}
            </GridList>
            <div className={classes.galleryButtons}>
                <Button
                    disabled={isLoadingMore || isReachingEnd}
                    onClick={() => setSize(size + 1)}
                    color="primary"
                    variant="outlined"
                    className={classes.button}
                >
                    {isLoadingMore
                        ? "Loading..."
                        : isReachingEnd
                            ? "There's no more photos"
                            : "Load more"}
                </Button>
                <Button
                    disabled={!size}
                    onClick={() => setSize(0)}
                    color="primary"
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